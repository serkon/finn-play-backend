import { auth } from '@/api/finn/authorization/authorization';
import { Login } from '@/api/finn/authorization/login';
import { Logout } from '@/api/finn/authorization/logout';
import { User } from '@/api/finn/authorization/users';
import { GamesApi } from '@/api/finn/games';
import { GroupsApi } from '@/api/finn/groups';
import { ProvidersApi } from '@/api/finn/providers';
import sample from '@/api/sample/list';
import remove from '@/api/upload/remove';
import upload from '@/api/upload/upload';
import * as express from 'express';

export const router = express.Router();
router.get('/api/sample/list', sample);
router.put('/api/upload', upload);
router.post('/api/upload/remove', remove);

/**
 * Authorization
 */
router.post('/api/v1/user', auth, User);
router.post('/api/v1/login', Login);
router.post('/api/v1/logout', Logout);

/**
 * Finn Game
 */

router.get('/api/v1/games', auth, GamesApi);
router.get('/api/v1/providers', auth, ProvidersApi);
router.get('/api/v1/groups', auth, GroupsApi);
