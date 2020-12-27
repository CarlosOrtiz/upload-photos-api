import app from './app';
import { startConnection } from '../@common/database'
const main = async () => {
  startConnection();
  await app.listen(app.get('port'));
  console.log(`App is running, server is listening on port ${app.get('port')}`);

}

main();