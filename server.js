const express = require('express');
const app = express();
const port = 4000;
const routes = require('./routes');
const cookieParser = require('cookie-parser')


app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser())


app.use('/api/v1', routes)

app.listen(port, () => {
  console.log(
    `QuestionPro app listening at ${port}`
  );
});
