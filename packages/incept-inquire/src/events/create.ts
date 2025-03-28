//stackpress
import type { ServerRequest } from '@stackpress/ingest/dist/types';
import type Response from '@stackpress/ingest/dist/Response';
//incept
import type Model from '@stackpress/incept/dist/schema/Model';
//actions
import create from '../actions/create';
//common
import type { DatabasePlugin } from '../types';

/**
 * This is a factory function that creates an event 
 * handler for creating a new record in the database
 * 
 * Usage:
 * emitter.on('profile-create', createEventFactory(profile));
 */
export default function createEventFactory(model: Model) {
  return async function CreateEventAction(req: ServerRequest, res: Response) {
    //if there is a response body or there is an error code
    if (res.body || (res.code && res.code !== 200)) {
      //let the response pass through
      return;
    }
    //get the database engine
    const engine = req.context.plugin<DatabasePlugin>('database');
    if (!engine) return;
    const input = model.input(req.data());
    const response = await create(model, engine, input);
    res.fromStatusResponse(response);
  };
};