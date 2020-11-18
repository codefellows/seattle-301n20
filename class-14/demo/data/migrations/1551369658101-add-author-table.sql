<!-- Query 1: Create authors table -->
CREATE TABLE authors (id SERIAL PRIMARY KEY, name VARCHAR(255));

<!-- Query 2:  Select distinct authors from the books table and insert into the authors table -->
INSERT INTO authors(name) SELECT DISTINCT author FROM books;

<!-- Query 3: Alter the books table to include a field for author id -->
ALTER TABLE books ADD COLUMN author_id INT;

<!-- Query 4: Retrieves the primary key on each author and fills in the author id field in the books table -->
UPDATE books SET author_id=author.id FROM (SELECT * FROM authors) AS author WHERE books.author = author.name;

<!-- Query 5: Retrieves the primary key on each author and fills in the author id field in the books table -->
ALTER TABLE books DROP COLUMN author;

<!-- Query 6: Set the author_id as the foreign key of the books table -->
ALTER TABLE books ADD CONSTRAINT fk_authors FOREIGN KEY (author_id) REFERENCES authors(id);
