/**
 * @swagger
 * tags:
 *   name: CustomerDoc
 *   description: Customer document management APIs
 */

/**
 * @swagger
 * /customerdoc:
 *   get:
 *     summary: Get all customer documents
 *     tags: [CustomerDoc]
 *     responses:
 *       200:
 *         description: List of customer documents
 *
 *   post:
 *     summary: Upload a new customer document
 *     tags: [CustomerDoc]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CustomerDoc'
 *     responses:
 *       201:
 *         description: Document uploaded
 */

/**
 * @swagger
 * /customerdoc/{id}:
 *   get:
 *     summary: Get customer document by ID
 *     tags: [CustomerDoc]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer document details
 *
 *   put:
 *     summary: Update a customer document
 *     tags: [CustomerDoc]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CustomerDoc'
 *     responses:
 *       200:
 *         description: Customer document updated
 *
 *   delete:
 *     summary: Delete a customer document
 *     tags: [CustomerDoc]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer document deleted
 */
