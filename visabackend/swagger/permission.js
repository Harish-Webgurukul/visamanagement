/**
 * @swagger
 * tags:
 *   name: Permission
 *   description: Permission management APIs
 */

/**
 * @swagger
 * /permission:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permission]
 *     responses:
 *       200:
 *         description: List of permissions
 *
 *   post:
 *     summary: Create a permission
 *     tags: [Permission]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Permission'
 *     responses:
 *       201:
 *         description: Permission created
 */

/**
 * @swagger
 * /permission/{id}:
 *   get:
 *     summary: Get permission by ID
 *     tags: [Permission]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Permission details
 *
 *   put:
 *     summary: Update a permission
 *     tags: [Permission]
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
 *             $ref: '#/components/schemas/Permission'
 *     responses:
 *       200:
 *         description: Permission updated
 *
 *   delete:
 *     summary: Delete a permission
 *     tags: [Permission]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Permission deleted
 */
