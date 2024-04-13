const { body, validationResult } = require('express-validator');

// responseボディに対して以下のバリデーション処理を実行
module.exports = [
    body('userId')
      .trim() // 入力のトリミング
      .notEmpty().withMessage('This field cannot be empty.')
      .isAlphanumeric().withMessage('Invalid characters used. Only alphanumeric characters are allowed.')
      .isLength({ min: 5 }).withMessage('The input must be at least 5 characters long.'),
    body('password')
      .trim() // ここではパスワードの例示的なバリデーションルールを適用
      .notEmpty().withMessage('Password cannot be empty.')
      .isAlphanumeric().withMessage('Invalid characters used. Only alphanumeric characters are allowed.')
      .isLength({ min: 5 }).withMessage('The input must be at least 5 characters long.'),
];