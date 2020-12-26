import app from './app';

async function main() {
  await app.listen(app.get('port'));
  console.log(`App is running, server is listening on port ${app.get('port')}`);

}

main();