import { body, ValidationChain } from 'express-validator';

const userValidationRules: ValidationChain[] = [
    body('username')
      .trim()
      .notEmpty().withMessage('ユーザ名が空になっています')
      .isAlphanumeric().withMessage('入力には英字と数字のみを使用してください')
      .isLength({ min: 5 }).withMessage('5文字以上で入力してください'),
    body('password')
      .trim()
      .notEmpty().withMessage('パスワードが空になっています')
      .isAlphanumeric().withMessage('入力には英字と数字のみを使用してください')
      .isLength({ min: 5 }).withMessage('5文字以上で入力してください')
];

export { userValidationRules };
