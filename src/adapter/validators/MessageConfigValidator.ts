import {
  query,
  body,
  oneOf,
  param,
  ValidationChain
} from 'express-validator';
export const validator = (method: string): ValidationChain[] | any => {
  return handles[method] || [];
};

const handles: any = {
  'gravar': [
    body('*.cd_status_motorista')
      .notEmpty().withMessage('required')
      .isInt().withMessage('expected integer'),
    // body('*.namespace_template_parceiro')
    //   .notEmpty().withMessage('required'),
    // body('*.nome_template_parceiro')
    //   .notEmpty().withMessage('required'),
    body('*.ativo')
      .notEmpty().withMessage('required')
      .isInt().withMessage('expected integer')
  ]
};
