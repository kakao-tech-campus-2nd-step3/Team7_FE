import { setupServer } from 'msw/node';
import { mainHandlers } from './mainHandlers';
import { detailHandlers } from './detailHandlers';
import { mapHandlers } from './mapHandlers';
import { myHandlers } from './myPageHandlers';

const server = setupServer(...mainHandlers, ...detailHandlers, ...mapHandlers, ...myHandlers);
export default server;
