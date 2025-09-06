/**
 * @swagger
 * tags:
 *   name: ShareLink
 *   description: Share link management APIs
 */

/**
 * @swagger
 * /sharelink:
 *   get:
 *     summary: Get all share links
 *     tags: [ShareLink]
 *     responses:
 *       200:
 *         description: List of share links
 *
 *   post:
 *     summary: Create a share link
 *     tags: [ShareLink]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShareLink'
 *     responses:
 *       201:
 *         description: Share link created
 */

/**
 * @swagger
 * /sharelink/{id}:
 *   get:
 *     summary: Get share link by ID
 *     tags: [ShareLink]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Share link details
 *
 *   put:
 *     summary: Update a share link
 *     tags: [ShareLink]
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
 *             $ref: '#/components/schemas/ShareLink'
 *     responses:
 *       200:
 *         description: Share link updated
 *
 *   delete:
 *     summary: Delete a share link
 *     tags: [ShareLink]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Share link deleted
 */
