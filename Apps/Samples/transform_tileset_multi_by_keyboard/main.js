/* eslint-disable new-cap */
import { EventListener } from './eventListener.js';
import { ConfigTool } from './config.js';
ConfigTool.getInstance();
const listener = new EventListener();
listener.onKeyDown();
