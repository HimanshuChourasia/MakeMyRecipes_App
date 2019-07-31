pipeline {
 environment {
  registryUrl = 'https://index.docker.io/v1'
  registryCredentials = 'dockerhub'
  registry = 'himanshuchourasia/makemyrecipes_1'
  dockerImage = ''
  dockerImageRegistry = "${registry}:${env.BUILD_ID}"
  shell_cmd = "curl -sI -X HEAD http://localhost:8000/ | head -n 1 | grep 200 | grep -q '200' && echo 'matched'"
 }
 agent any
 tools {
  nodejs "NODE_JS"
 }
 stages {
  stage('Build') {
   steps {
    sh "npm install"
   }
  }
  stage('Test') {
   steps {
    sh "npm test"
   }
  }
  stage('Building an Docker Image') {
   steps {
    script {
     dockerImage = docker.build(dockerImageRegistry)
    }

   }
  }

  stage('pushing to a Registry') {
   steps {
    script {
     docker.withRegistry('', registryCredentials) {
      dockerImage.push('latest')
     }



    }
   }
  }
  stage('Building a docker-compose') {
   steps {
    sh "docker-compose build"
   }

  }
  stage('Deploying to staging server') {

   steps {
    sh "docker-compose up -d"
   }
  }
  stage('Check Availability') {
   steps {
    script {
     node {
      try {
      	sh "docker container exec -i MakeMyRecipesApp sh -c \"${shell_cmd}\"" 
      	currentBuild.result = 'SUCCESS'
           
      	

       

      } catch (Exception e) {
       sh "echo 'not matched'"
        currentBuild.result = 'FAILURE'
      }
      



     }


    }

   }




  }
 }
 post {
     always {
         
        echo "Task completed with result ${currentBuild.result}"
        
     }
     success{
         echo "Success"
         deleteDir()
     }
     unstable{
         echo "Build unstable performing clean up"
         sh "docker-compose down --rmi all --volumes"
         deleteDir()
     }
     failure{
         echo "Build failed performing clean up"
         sh "docker-compose down --rmi all --volumes"
         deleteDir()
     }
     changed{
         
         echo "Changes successfully executed"
         
     }

}


     
 }

 
