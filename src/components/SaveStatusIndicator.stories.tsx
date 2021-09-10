import React from 'react';

import SaveStatusIndicator, { Variant } from './SaveStatusIndicator';

export default { title: 'SaveStatusIndicator' };

export const saved = () => {
  return (
    <SaveStatusIndicator variant={Variant.Saved} />
  )
}

export const saving = () => {
  return (
    <SaveStatusIndicator variant={Variant.Saving} />
  )
}

export const error = () => {
  return (
    <SaveStatusIndicator variant={Variant.Error} />
  )
}
