module.exports = error => `
<html>
  <head>
    <title>Error 500</title>
    <meta charset="utf-8">
  </head>

  <body>Internal Server Error</body>

  <script>console.error(\`${error.stack}\`);</script>
</html>
`;
