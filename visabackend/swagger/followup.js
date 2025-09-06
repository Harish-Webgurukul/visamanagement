/**
 * @swagger
 * tags:
 *   name: Followup
 *   description: Followup management APIs
 */

/**
 * @swagger
 * /followup:
 *   get:
 *     summary: Get all followups
 *     tags: [Followup]
 *     responses:
 *       200:
 *         description: List of followups
 *
 *   post:
 *     summary: Create a new followup
 *     tags: [Followup]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Followup'
 *     responses:
 *       201:
 *         description: Followup created
 */

/**
 * @swagger
 * /followup/{id}:
 *   get:
 *     summary: Get followup by ID
 *     tags: [Followup]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Followup details
 *
 *   put:
 *     summary: Update a followup
 *     tags: [Followup]
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
 *             $ref: '#/components/schemas/Followup'
 *     responses:
 *       200:
 *         description: Followup updated
 *
 *   delete:
 *     summary: Delete a followup
 *     tags: [Followup]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Followup deleted
 */
