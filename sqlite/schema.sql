CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        age INTEGER DEFAULT 0,
        lastLogin INTEGER DEFAULT 0,
        name TEXT,
        gender TEXT,
        email TEXT,
        pwd TEXT,
        role TEXT,
        cityOfBirth TEXT
        );
