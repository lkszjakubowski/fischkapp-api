import { Router } from 'express';
import { validateRequest } from '../middleware';
import {
  createCardHandler,
  findCardsHandler,
  findCardsByAuthorHandler,
  findCardByIdHandler,
  findCardsByTagHandler,
  updateCardHandler,
  deleteCardHandler,
} from './card.handlers';
import {
  createCardSchema,
  deleteCardSchema,
  getCardSchema,
  updateCardSchema,
} from './card.schemas';

const router = Router();

/**
 * @openapi
 * /cards:
 *  get:
 *    tags:
 *    - Flashcards
 *    summary: Get all flashcards
 *    responses:
 *     200:
 *       description: List of all cards
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ArrayOfFlashcards'
 *           examples:
 *             flashcardArray:
 *               $ref: '#/components/examples/flashcardArray'
 *     401:
 *      description: Authorization information is missing or invalid
 *     5xx:
 *      description: Unexpected error
 *  post:
 *    tags:
 *    - Flashcards
 *    summary: Create a new flashcard
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/FlashcardInput'
 *          examples:
 *            flashcardInputExample:
 *              $ref: '#/components/examples/flashcardInputExample'
 *    responses:
 *     201:
 *       description: Flashcard created successfully
 *     401:
 *      description: Authorization information is missing or invalid
 *     403:
 *      description: Validation error. Input is incorrect.
 *     5xx:
 *      description: Unexpected error
 * /cards/author/{author}:
 *  get:
 *    tags:
 *    - Flashcards
 *    summary: Get flashcards by author
 *    parameters:
 *      - in: path
 *        name: author
 *        schema:
 *          type: string
 *        required: true
 *        description: Authors name
 *    responses:
 *      200:
 *        description: List of all cards by author
 *      401:
 *        description: Authorization information is missing or invalid
 *      403:
 *        description: Validation error. Provided authors name is incorrect
 *      404:
 *        description: Couldn't find flashcard with a given authors name
 *      5xx:
 *        description: Unexpected error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ArrayOfFlashcards'
 *            examples:
 *              flashcardExample:
 *                $ref: '#/components/examples/flashcardExample'
 * /cards/tags/{tag}:
 *  get:
 *    tags:
 *    - Flashcards
 *    summary: Get flashcards by tag
 *    parameters:
 *      - in: path
 *        name: tag
 *        schema:
 *          type: string
 *        required: true
 *        description: tag name
 *    responses:
 *      200:
 *        description: List of all flashcards by tag
 *      401:
 *        description: Authorization information is missing or invalid
 *      403:
 *        description: Validation error. Provided tag name is incorrect
 *      404:
 *        description: Couldn't find flashcard with a given tag
 *      5xx:
 *        description: Unexpected error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ArrayOfFlashcards'
 *            examples:
 *              flashcardExample:
 *                $ref: '#/components/examples/flashcardExample'
 * /cards/{flashcardId}:
 *  get:
 *    tags:
 *    - Flashcards
 *    summary: Get flashcard by ID
 *    parameters:
 *      - in: path
 *        name: flashcardId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the flashcard to get
 *    responses:
 *      200:
 *        description: Single flashcard
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ArrayOfFlashcards'
 *            examples:
 *              flashcardExample:
 *                $ref: '#/components/examples/flashcardExample'
 *      401:
 *        description: Authorization information is missing or invalid
 *      403:
 *        description: Validation error. Provided ID is incorrect
 *      404:
 *        description: Couldn't find flashcard with a given ID
 *      5xx:
 *        description: Unexpected error
 *  delete:
 *    tags:
 *    - Flashcards
 *    summary: Deletes a flashcard
 *    parameters:
 *      - in: path
 *        name: flashcardId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the flashcard to delete
 *    responses:
 *      204:
 *        description: Flashcard deleted
 *      401:
 *        description: Authorization information is missing or invalid
 *      403:
 *        description: Validation error. Provided ID is incorrect
 *      404:
 *        description: Couldn't find flashcard with a given ID
 *      5xx:
 *        description: Unexpected error
 *  put:
 *    tags:
 *    - Flashcards
 *    summary: Updates a flashcard
 *    parameters:
 *      - in: path
 *        name: flashcardId
 *        schema:
 *          type: string
 *        required: true
 *        description: ID of the flashcard to update
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/FlashcardInput'
 *          examples:
 *            flashcardInputExample:
 *              $ref: '#/components/examples/flashcardInputExample'
 *    responses:
 *      200:
 *        description: Updated flashcard
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ArrayOfFlashcards'
 *            examples:
 *              flashcardExample:
 *                $ref: '#/components/examples/flashcardExample'
 *      401:
 *        description: Authorization information is missing or invalid
 *      403:
 *        description: Validation error. Input is incorrect
 *      404:
 *        description: Couldn't find flashcard with a given ID
 *      5xx:
 *        description: Unexpected error
 * components:
 *  securitySchemes:
 *    ApiKeyAuth:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 * security:
 *  - ApiKeyAuth: []
 *
 */
router.get('/', findCardsHandler);
router.get(
  '/author/:author',
  validateRequest(getCardSchema),
  findCardsByAuthorHandler
);
router.get('/tags/:tag', validateRequest(getCardSchema), findCardsByTagHandler);
router.get('/:id', validateRequest(getCardSchema), findCardByIdHandler);
router.post('/', validateRequest(createCardSchema), createCardHandler);
router.put('/:id', validateRequest(updateCardSchema), updateCardHandler);
router.delete('/:id', validateRequest(deleteCardSchema), deleteCardHandler);

export default router;
