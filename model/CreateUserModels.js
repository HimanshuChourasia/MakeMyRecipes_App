// var  UserDb = require('./UserDB');
// var Item = require('./item');
// var user = require('./User');
// var userItem = require('./UserItem');
// var userProfile = require('./UserProfile');
// const ingredients_1 = ['1 medium cauliflower head — cut into florets',' 1 tablespoon vegetable oil — or if you prefer you can use olive oil',
//     '2 cups white onions — chopped',
//     '3 cloves garlic — minced',
//     '1 teaspoon cumin',
//     '¼ teaspoon ground coriander',
//     '4 teaspoons curry powder',
//     'Salt and black pepper to taste',
//     '2 cups diced tomato with the juice from the can',
//     '2 cups green peas — frozen or fresh',
//     '1 ¾ cups coconut milk from the can — not carton coconut milk'
// ]
//
// const ingredients_2 = ['2 Tablespoons butter',
//     '8 oz package sliced button mushrooms',
//     '1/2 cup diced yellow onion',
//     '2 Tablespoons all-purpose flour',
//     '2 cups low-sodium beef broth',
//     '1 teaspoon coarse ground pepper',
//     '2 teaspoons apple cider vinegar',
//     '1 Tablespoon cornstarch mixed with 1 Tablespoon water',
//     'chopped parsley for garnish']
//
// const ingredients_3 = ['Vegetable oil, for frying',
//     '1 1/2 to 2 pounds fresh cod',
//     'Salt and pepper',
//     '1 /2 cup all-purpose unbleached flour',
//     '2 large eggs',
//     '2 tablespoons cold water, a splash',
//     '2 cups plain bread crumbs',
//     '1/2 teaspoon dried mustard powder',
//     '1/4 teaspoon cayenne pepper, a few pinches',
//     'Wedged lemons and malt vinegar for topping'
// ]
// const ingredients_4 = ['1 cup yogurt',
//     '1 tablespoon lemon juice',
//     '2 teaspoons fresh ground cumin',
//     '1 teaspoon ground cinnamon',
//     '2 teaspoons cayenne pepper',
//     '2 teaspoons freshly ground black pepper',
//     '1 tablespoon minced fresh ginger',
//     '1 teaspoon salt, or to taste',
//     '3 boneless skinless chicken breasts, cut into bite-size pieces',
//     '1 cup heavy cream',
//     '1/4 cup chopped fresh cilantro']
//
// const ingredients_5 = ['2 tablespoons sesame oil',
//     '1 pound boneless beef short ribs cut into 1-inch cubes',
//     '1 medium onion diced',
//     '2 medium carrots peeled and cubed',
//     '2 small red or yellow potatoes peeled and cubed',
//     '1/2 large sweet potato peeled and cubed',
//     '3 cups water',
//     '1 packet 100 grams Korean curry powder (See Recipe Note)',
//     'Diced chives to garnish',
//     'Steamed white rice to serve',
//     'Kimchi to serve']
//
// const ingredients_6 = ['1 1/2 cups uncooked white rice',
//     '3 cups water',
//     '4 tablespoons vegetable oil',
//     '1 cup fresh bean sprouts',
//     '1/2 cup chopped onion',
//     '1 1/2 cups cooked medium shrimp, peeled and deveined without tail',
//     '1/4 cup chopped green onion',
//     '2 eggs, beaten',
//     '1 teaspoon salt',
//     '1/4 teaspoon ground black pepper',
//     '4 tablespoons soy sauce',
//     '1/4 teaspoon sesame']
//
// const ingredients_7 = ['1 lb fettuccine',
//     '12 oz white mushrooms sliced',
//     '4 ounces unsalted butter',
//     '2 cups heavy cream',
//     '2 cups grated romano cheese',
//     'freshly ground black pepper',
//     '1 tsp finely chopped Italian parsley']
//
// const ingredients_9 = ['2 tablespoons butter.',
//     '2 tablespoons all-purpose flour.',
//     '1/8 teaspoon salt.',
//     'Dash white pepper.',
//     '1 cup 2% milk.']
//
// const ingredients_8 = ['1 tablespoon oil.',
//     '1 onion minced.',
//     '3 large carrots peeled and diced.',
//     '1 rib celery diced.',
//     '1 teaspoon minced garlic.',
//     '1 teaspoon dried parsley.',
//     '1/2 teaspoon dried thyme.',
//     '5 cups low sodium chicken broth.']
// const ingredients_10 = ['2-1/2 pounds bony chicken pieces (legs, wings, necks or back bones)',
//     '2 celery ribs with leaves, cut into chunks.',
//     '2 medium carrots, cut into chunks.',
//     '2 medium onions, quartered.',
//     '2 bay leaves.',
//     '1/2 teaspoon dried rosemary, crushed.',
//     '1/2 teaspoon dried thyme.',
//     '8 to 10 whole peppercorns.']
// const ingredients_11 = ['4 chicken breasts boneless and skinless.',
//     '1/4 teaspoon coarse ground black pepper.',
//     '4 tablespoons flour.',
//     '2 large eggs.',
//     '1 cup panko bread crumbs.',
//     '1/2 cup grated Parmesan cheese.',
//     '2 tablespoons olive oil.',
//     '2 tablespoons butter.']
//
//
// const ingredients_12 = ['1 1/2 cups white rice cooked',
//     '2 cups milk divided',
//     '1/3 cup sugar',
//     'pinch salt',
//     '1 egg',
//     '2/3 cup raisins',
//     '1 tablespoon butter',
//     '1/2 teaspoon vanilla',
//     'cinnamon',
//     'nutmeg']
//
//
//
// const directions_1 = ['preheat the oven to 425',
//     'cut cauliflower florets off the stem',
//     'Mix it with some olive oil',
//     'add salt, black pepper, and garlic powder.',
//     'After that just spread it evenly in a rimmed baking sheet and bake for about 20-25 minutes.',
//     'Starting out as if  making cauliflower pizza crust make a few modifications to make these little cauliflower Parmesan crisps.' ];
//
// const directions_2 = ['Melt the butter in a large pan over medium high heat.',
//     'Add the mushrooms and thyme, then season generously with salt and pepper.',
//     'Cook, stirring occasionally, until mushrooms are golden brown and tender, about 7 minutes.',
//     'Stir in garlic, cook for an additional 30 seconds.',
//     'Sprinkle with parsley and serve.'
// ]
//
// const directions_3 = ['Heat oven to 375°F. Grease bottom of rectangular pan, 11x7x1 1/2 inches.',
//     'Cut fish fillets into 4 serving pieces if needed. Place pieces , skin sides down, in the pan, folding thin ends under if necessary for even thickness.',
//     'Mix remaining ingredients; drizzle over fish.',
//     'Bake uncovered 15 to 20 minutes or until fish flakes easily with fork.'
// ]
// const directions_4 = ['n a large bowl, combine yogurt, lemon juice, 2 teaspoons cumin, cinnamon, cayenne, black pepper, ginger, and salt. Stir in chicken, cover, and refrigerate for 1 hour.',
//     'Preheat a grill for high heat.',
//     'Lightly oil the grill grate. Thread chicken onto skewers, and discard marinade. Grill until juices run clear, about 5 minutes on each side.',
//     'Melt butter in a large heavy skillet over medium heat. Saute garlic and jalapeno for 1 minute. Season with 2 teaspoons cumin, paprika, and 3 teaspoons salt. Stir in tomato sauce and cream. Simmer on low heat until sauce thickens, about 20 minutes. Add grilled chicken, and simmer for 10 minutes. Transfer to a serving platter, and garnish with fresh cilantro.',
//
// ]
// const directions_5 = ['Melt the butter in a large pan over medium high heat.',
//     'Heat the butter in a large heavy pot over medium high heat. When it starts to melt add the pork and stir for a few minutes until the pork is no longer pink. Add the potatoes and stir for a few more minutes until the potatoes turn semi-translucent. Add the carrot and onion and stir for a few minutes.',
//     'Add 2½ cups water, stir a few times, cover, and turn down the heat to medium. Cook for 10 to 12 minutes until the potatoes are tender',
//     'Add the curry and water mixture to the pot. Stir well for a few minutes until the sauce is creamy. Remove from the heat.',
//     'Ladle the curry sauce on top of fresh rice and serve immediately with kimchi.'
//
// ]
// const directions_6 = ['If frozen, thaw the shrimp. If your shrimp are frozen, place them in a colander in the sink and run cold water over them for about 5 minutes. Toss the shrimp occasionally to make sure they are all exposed to the cold water.',
//     'The shrimp will bend easily when thawed. The shrimp is thawed and ready when they are no longer frozen solid but soft, easily bendable, and slightly translucent. This will only take a few minutes. Pat the shrimp dry with paper towels.',
//     'Heat the oil or butter over medium-high heat. Place the oil or butter in a large frying pan over medium-high heat. Tilt the pan as the oil warms, or butter melts, to coat the bottom of the pan.',
//     'Add the shrimp to the hot pan. When the butter is melted or the oil moves around the pan easily, add the shrimp. They should sizzle on contact (if not, warm your pan a little longer next time).',
//     'Season the shrimp with salt and pepper. Sprinkle salt and pepper over the shrimp. Be generous! You can also add any other seasonings at this point — chili spice, curry spice, a bit of harissa, or any other seasonings in your cupboard.',
//     'Sauté the shrimp until pink and opaque. The shrimp will start off looking grey and translucent, but will gradually become pink and opaque as they cook through. The tails will also turn bright red. Cook the shrimp, stirring occasionally, until the flesh is totally pink and opaque, and you see no more grey bits. Depending on the size of your shrimp and how many you have in the pan, this will usually take 4 to 5 minutes.',
//     'Transfer to a serving dish. Serve sautéed shrimp immediately with pasta or over grains. Leftover shrimp is also fantastic in salads or cold preparations.'
// ]
//
//
// const directions_7 = ['Bring a large pot of lightly salted water to a boil. Add fettuccini and cook for 8 to 10 minutes or until al dente; drain. ',
//     'In a large saucepan, melt butter into cream over low heat. Add salt, pepper and garlic salt. Stir in cheese over medium heat until melted; this will thicken the sauce.',
//     'Add pasta to sauce. Use enough of the pasta so that all of the sauce is used and the pasta is thoroughly coated. Serve immediately. '
// ]
//
//
// const directions_8 = ['Bring broth to a boil in a saucepan over medium-high heat.',
//     'Add in rice, stir, cover, and reduce to low.',
//     'Cook on low for 20 minutes, or until broth is absorbed and rice is tender.',
//     'Sprinkle with parsley and serve.'
// ]
//
// const directions_9 = ['Boil water in a large pot To make sure pasta doesn’t stick together, use at least 4 quarts of water for every pound of noodles.',
//     'Salt the water with at least a tablespoon—more is fine The salty water adds flavor to the pasta.',
//     'Add pasta Pour pasta into boiling water. Don’t break the pasta; it will soften up within 30 seconds and fit into the pot.',
//     'Stir the pasta As the pasta starts to cook, stir it well with the tongs so the noodles don’t stick to each other (or the pot).',
//     'Test the pasta by tasting it Follow the cooking time on the package, but always taste pasta before draining to make sure the texture is right. Pasta cooked properly should be al dente—a little chewy.',
//     'Drain the pasta Drain cooked pasta well in a colander. If serving hot, add sauce right away; if you’re making a pasta salad, run noodles under cold water to stop the cooking.'
// ]
//
//
// const directions_10 = ['Combine chicken, lemon juice, and soy sauce in a bowl. Mix well. Marinate for 15 minutes.',
//     'Melt butter in a cooking pot. Once the butter start to bubble, add the marinated chicken. Include the marinade. Stir and cook for 2 minutes.',
//     'Add chorizo de bilbao. Cook for 5 minutes.',
//     'Pour water. Let boil. Add Knorr Chicken Cube. Stir and cook for 12 minutes.',
//     'Add beef frank, carrot, potato, and mushroom. Cook for 2 minutes.'
// ]
// const directions_11 = ['Melt the butter in a large pan over medium high heat.',
//     'Add the mushrooms and thyme, then season generously with salt and pepper.',
//     'Cook, stirring occasionally, until mushrooms are golden brown and tender, about 7 minutes.',
//     'Stir in garlic, cook for an additional 30 seconds.',
//     'Sprinkle with parsley and serve.',
//     'Pour table cream. Stir until well blended. Cook for 5 minutes',
//     'Season with salt and pepper.Preheat oven to 375F. Transfer the chicken pastel to a baking pan or oven-proof container. Cover with pie dough. Poke holes on the dough for steam to escape.Bake for 25 minutes.',
//     'Remove from the oven. Serve.'
// ]
// const directions_12 = ['Bring 1 1/2 cups water to a boil in a saucepan; stir rice into boiling water. Reduce heat to low, cover, and simmer for 20 minutes. ',
//     'In a clean saucepan, combine 1 1/2 cups cooked rice, 1 1/2 cups milk, sugar and salt. Cook over medium heat until thick and creamy, 15 to 20 minutes. Stir in remaining 1/2 cup milk, beaten egg, and raisins; cook 2 minutes more, stirring constantly. Remove from heat and stir in butter and vanilla.'
// ]
//
//
// var user_1 = new user('U001','John','Doe','jdoe@gmail.com','9876 Rochester park','Downs street','Charlotte','North Carolina','254789','Mcklenberg','abcdef');
// var user_2 = new user('U002','Rachel','Doe','rdoe@gmail.com','9876 Rochester park','Downs street','Charlotte','North Carolina','254789','Mcklenberg','uvwxyz');
//
// var item_1 = new Item('A001','Cauliflower_Curry','Appetizer','Cauliflower is one of several vegetables in the species Brassica oleracea in the genus Brassica, which is in the family Brassicaceae. It is an annual plant that reproduces by seed. Typically, only the head is eaten – the edible white flesh sometimes called "curd"',5,directions_1,ingredients_1,'Admin');
// var item_2 = new Item('A002','Mushroom','Appetizer','Snails are sauteed in garlic butter and stuffed in mushroom caps. When microwaving the mushroom caps, be careful they don\'t shrivel. Serve with garlic bread to lap up the running juices.',4,directions_2,ingredients_2,'Admin');
// var item_3 = new Item('A003','Fish Appetizer','Appetizer','These warm potato-smoked salmon bites will be the hit of your next party. Smoked salmon is mixed with fresh yogurt, dill, and capers, and tops crispy potato skins.',3,directions_3,ingredients_3,'Admin');
// var item_4 = new Item('A004','Chicken tikka','Appetizer','This is an easy recipe for Chicken Tikka Masala--chicken marinated in yogurt and spices and then served in a tomato cream sauce. Serve with rice or warm pita bread',4,directions_4,ingredients_4,'Admin');
// var item_5 = new Item('M001','Korean Curry ','Entrée','Mild curry dish popular in Korea, includes ingredients you can find in your local grocery store and Korean/Asian market. The \'Ottogi\' version of the curry simply leaves out the meat, making this a great dish for vegetarians. Feel free to add bell peppers. It is important to note that the curry powder used in this recipe is a pre-made mixture and not regular curry powder you can buy in every supermarket. I personally use Assi brand Korean products in my kitchen. For this recipe, I used \'Assi curry powder, mild-hot.\' Serve over rice',2,directions_5,ingredients_5,'');
// var item_6 = new Item('M002','Exotic Prawns','Entrée','I am going to give you my gumbo recipe. I learned to cook from my mother and grandmother who were born and raised in New Orleans and really knew how to cook. Most of the time, you could not get them to write down their recipes because they used a \'pinch\' of this and \'just enough of that\' and \'two fingers of water,\' and so on. This recipe is a combination of both of their recipes which I have added to over the years. Serve over hot cooked rice. The gumbo can be frozen or refrigerated and many people like it better the next day. Bon appetit!',2,directions_6,ingredients_6,'Admin');
// var item_7 = new Item('M003','Italian Fettucine','Entrée','This is one of my favorite soups and it always gets rave reviews! Salad, hard rolls and wine make a meal! You can make this 24 hours ahead of time without the noodles and wait to add the spinach noodles until soup is reheated for serving. Yummy! Serve topped with grated Parmesan!',2,directions_7,ingredients_7,'');
// var item_8 = new Item('M004','Rice Broth ','Entrée','Here\'s my version of what\'s often called \'the San Francisco treat,\' although the next time I see this served here will be the first time. I used real chicken broth and a variety of seasonings.',2,directions_8,ingredients_8,'Admin');
// var item_9 = new Item('M005','White Pasta ','Entrée','My husband lived in Italy for 3 years, so he\'s really picky about his Italian cuisine! I needed a great meal that was super-quick one night for his dinner; I had spicy battered shrimp on hand that I wanted to use and a couple choices of dried pasta. This sauce sounded perfect to tie it all together! Served over tortiglioni pasta with salad and toasted Italian bread. Just like I spent all day on dinner. It is really hard to mess-up this kind of white sauce. In my opinion, it was very much like an Alfredo sauce! Of course there is very little difference in the two sauces.',2,directions_9,ingredients_9,'Admin');
// var item_10 = new Item('M006','Chicken Parmesan','Entrée','My version of chicken parmesan is a little different than what they do in the restaurants, with less sauce and a crispier crust.',2,directions_10,ingredients_10,'');
// var item_11 = new Item('M007','Chicken Broth ','Entrée','Start this flavorful chicken broth by roasting the chicken first, then use all the dark meat to fortify the broth.',2,directions_11,ingredients_11,'Admin');
// var item_12 = new Item('M008','Rice pudding','Entrée','Rich, comforting dessert with chewy raisins and fragrant cinnamon. My mom used to make this all the time, everyone loved it. Very refreshing! Serve with fresh whipped cream.',2,directions_12,ingredients_12,'');
//
//
// var user_item_1 = new userItem('A001',5,true,'Appetizer','Cauliflower_Curry');
// var user_item_2 = new userItem( 'A002',4,false,'Appetizer','Mushroom');
// var user_item_3 = new userItem( 'A003',3,true,'Appetizer','Fish Appetizer');
// var user_item_4 = new userItem( 'A004',4,false,'Appetizer','Chicken tikka');
// var user_item_5 = new userItem( 'M001',2,true,'Entrée','Korean Curry');
// var user_item_6 = new userItem( 'M002',2,true,'Entrée','Exotic Prawns');
// var user_item_7 = new userItem( 'M003',2,false,'Entrée','Italian Fettucine');
// var user_item_8 = new userItem( 'M004',2,true,'Entrée','Rice Broth ');
// var user_item_9 = new userItem('M005',2,true,'Entrée','White Pasta ');
// var user_item_10 = new userItem('M006',2,false,'Entrée','Chicken Parmesan');
// var user_item_11 = new userItem('M007',2,true,'Entrée','Chicken Broth');
// var user_item_12 = new userItem('M008',2,true,'Entrée','Rice pudding');
//
// let user_item_list_1 = [user_item_1,user_item_3,user_item_5,user_item_7,user_item_9,user_item_11];
// let user_item_list_2 = [user_item_2,user_item_4,user_item_6,user_item_8,user_item_10,user_item_12];
// let user_profile_1 = new userProfile('U001',user_item_list_1);
// let user_profile_2 = new userProfile('U002',user_item_list_2) ;
// let user_profile_list = [user_profile_1,user_profile_2];
// let user_list = [user_1,user_2];
//
// var user_DB = new UserDb(user_list,user_profile_list);
//
//
// /*let userlist = user_DB.getuser_list();
// userlist.forEach(function (user) {
//    console.log('UserID '+ user.getuserid());
//     console.log('First Name '+ user.getfirstName());
//     console.log('Last Name '+ user.getlastName());
//     console.log('Email Address '+ user.getemailAddress());
//     console.log('Address_1'+ user.getaddress_1());
//     console.log('Address_2'+ user.getaddress_2());
//     console.log('ZipCode '+ user.getzipCode());
//     console.log('State'+ user.getstate());
//     console.log('Country'+ user.getcountry());
//     console.log('Password'+ user.getPassword());
// });*/
// /*
// var item_13 = new Item('A006','Kimcha long fired','Entrée','Rich, comforting dessert with chewy raisins and fragrant cinnamon. My mom used to make this all the time, everyone loved it. Very refreshing! Serve with fresh whipped cream.',2,directions_12,ingredients_12,'');
// let user_item_13 = new userItem(item_13,5,true);
// let user_p_list = user_DB.getuser_profile();
// let u_profile = user_p_list[0];
// u_profile.addItem(user_item_13);
// //u_profile.removeItem('A001');
// var item_14 = new Item('A005','Rice curry','Entrée','Rich, comforting dessert with chewy raisins and fragrant cinnamon. My mom used to make this all the time, everyone loved it. Very refreshing! Serve with fresh whipped cream.',2,directions_12,ingredients_12,'');
// let user_item_14 = new userItem(item_14,10,true);
// //u_profile.updateItem(user_item_14);
// u_profile.addItem(user_item_14);
// //u_profile.emptyProfile();
// let user_profile_item_list = u_profile.getItems();
// user_profile_item_list.forEach(function (user_item_list) {
// console.log('User Item Code: '+ user_item_list.getUserItem().getItemCode());
// console.log('User Rating: '+ user_item_list.getRating());
// console.log('User Made It: '+ user_item_list.getMadeIt());
// });
// */
//
// module.exports = user_DB ;
//
