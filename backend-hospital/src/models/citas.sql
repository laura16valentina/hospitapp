USE nodelogin;

CREATE TABLE IF NOT EXISTS citas(
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100)NOT NULL,
email VARCHAR(100)NOT NULL,
especialidad VARCHAR(50)NOT NULL,
fecha VARCHAR(255)NOT NULL
);
