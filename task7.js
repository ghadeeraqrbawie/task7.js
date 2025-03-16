 
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());  
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bowling'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
}); 
app.post('/scores', (req, res) => {
  const { player_name, score } = req.body;
  db.query('INSERT INTO scores (player_name, score) VALUES (?, ?)', [player_name, score], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Score added', id: result.insertId });
  });
});
app.get('/scores', (req, res) => {
  db.query('SELECT * FROM scores ORDER BY score DESC', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
}); 
app.delete('/scores/:id', (req, res) => {
  db.query('DELETE FROM scores WHERE id = ?', [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Score deleted' });
  });
});
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
