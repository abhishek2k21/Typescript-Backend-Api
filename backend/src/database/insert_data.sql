
INSERT INTO "User" (username, phone) 
VALUES ('john_doe', '1234567890')
ON CONFLICT (username) DO NOTHING;  



INSERT INTO "Profile" (userId, email, gender, address, pincode, city, state, country) 
VALUES (
    (SELECT id FROM "User" WHERE username = 'john_doe' LIMIT 1),
    'john@example.com', 
    'male', 
    '123 Main St', 
    '123456', 
    'Metropolis', 
    'NY', 
    'USA'
);
