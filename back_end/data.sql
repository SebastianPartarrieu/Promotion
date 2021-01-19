-- initial data for testing purposes

-- initial agglomeration
INSERT INTO Agglomeration(anom) VALUES ('Paris'), ('Caen'), ('Nice');

-- initial categories
INSERT INTO Categorie(catnom) VALUES ('Restaurant'), ('Textile'), ('Librairie');

-- fictional clients and stores
INSERT INTO Client(clnom, clpnom, clemail, aid, clmdp) VALUES
('Stonebraker', 'Michael', 'mstonebraker@turing.org', 1, 'password'), 
('Codd', 'Edgar', 'ecodd@turing.org', 1, 'password'),
('Gray', 'James', 'jgray@turing.org', 2, 'Password'), 
('GenericName', 'Calvin', 'calvin.hobbes@me.com', 3, 'PaSSword');

INSERT INTO Commerce(cnom, cpresentation, code_postal, rue_and_num, aid, cmdp, cemail) VALUES
('Pizza Mario', 'Pizza italienne au feu de bois', 75005, '208 Rue Saint Jacques', 1, 'password', 'pizzamario@shop.com'),
('Pizza Luigi', 'Pizza italienne au feu de bois', 14000, '2 Rue Caen', 2, 'Password', 'pizzaluigi@pizza.fr'),
('Fashion & books Nice', 'Devenez les stars de la promenade des Anglais', 06100, '5 Avenue Jean Medecin', 3, 'PASSword', 'fashion_books@nice.fr'),
('Pizza Mario', 'Pizza italienne au feu de bois', 06100, '19 Av Jean Medecin', 3, 'Password!', 'pizzanice@mario.fr');

-- linking stores with their categories
INSERT INTO CommerceCategorie(cid, catid) VALUES (1, 1), (2, 1), (3, 2), (3, 3);

-- one or two promotions
INSERT INTO Promotion(cid, pdescription, tdebut, tfin) VALUES (1, 'La Marguerite a 7€!!!', '14-01-2021'::DATE, NULL),
(1, 'La Napolitaine a 8€', '15-01-2021', '28-01-2021'),
(3, 'Tous les livres à moins de 10€', '10-12-2020', NULL),
(2, 'Formule étudiante à 6 euros 50', '01-01-2021', '01-01-2021');

-- calvin loves food 
INSERT INTO ClientCategorie(clid, catid) VALUES (4, 1), (1, 3);

-- calvin loves mario's pizzas
INSERT INTO ClientFavCommerce(clid, cid) VALUES (4, 4), (2, 1), (3, 2); 

INSERT INTO Admins(adminemail, adminmdp) VALUES ('sebastian.partarrieu@mines-paristech.fr', 'amazingpassword');
