/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management endpoints
 */

/**
 * @swagger
 * /role:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *
 *   post:
 *     summary: Create a new role
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - permissions
 *             properties:
 *               name:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 */

/**
 * @swagger
 * /role/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: [Roles]
 *
 *   put:
 *     summary: Update a role by ID
 *     tags: [Roles]
 *
 *   delete:
 *     summary: Delete a role by ID
 *     tags: [Roles]
 */
