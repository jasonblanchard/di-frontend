import '@emotion/react'

import { Theme as DiTheme } from './themes';

declare module '@emotion/react' {
    export interface Theme extends DiTheme { }
}