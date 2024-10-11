import { setupWorker } from 'msw/browser';
import { mainHandlers } from './mainHandlers';
import { detailHandlers } from './detailHandlers';
import { mapHandlers } from './mapHandlers';
import { myHandlers } from './myPageHandlers';

export const worker = setupWorker(...mainHandlers, ...detailHandlers, ...mapHandlers, ...myHandlers);
export default worker;
