pipeline {
 environment {
  registryUrl = 'https://index.docker.io/v1'
  registryCredentials = 'dockerhub'
  registry = 'himanshuchourasia/makemyrecipes_1'
  dockerImage = ''
  dockerImageRegistry = "${registry}:${env.BUILD_ID}"
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
      dockerImage.push()
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





 }
}