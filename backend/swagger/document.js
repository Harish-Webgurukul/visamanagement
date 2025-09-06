/**
 * @swagger
 * tags:
 *   name: Document
 *   description: Document management APIs
 */

/**
 * @swagger
 * /document:
 *   get:
 *     summary: Get all documents
 *     tags: [Document]
 *     responses:
 *       200:
 *         description: List of documents
 *
 *   post:
 *     summary: Create a new document
 *     tags: [Document]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Document'
 *     responses:
 *       201:
 *         description: Document created
 */

/**
 * @swagger
 * /document/{id}:
 *   get:
 *     summary: Get document by ID
 *     tags: [Document]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document details
 *
 *   put:
 *     summary: Update a document
 *     tags: [Document]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Document'
 *     responses:
 *       200:
 *         description: Document updated
 *
 *   delete:
 *     summary: Delete a document
 *     tags: [Document]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Document deleted
 */
