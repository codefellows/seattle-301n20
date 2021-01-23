INSERT INTO tasks (title, description, contact, status, category) VALUES ('feed the cat', 'millie requires wet food that is delicious.  please and thank you', 'ray', 'incomplete', 'pets') RETURNING *;

INSERT INTO tasks (title, description, contact, status, category) VALUES ('take out trash', 'walk the trash over to the trash room', 'ray', 'incomplete', 'chores') RETURNING *;