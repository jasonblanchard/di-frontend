export interface Theme {
    typography: {
        fonts: {
            serif: string
            sansSerif: string
        }
        sizes: {
            body: string
            mainHeading: string
        }
        colors: {
            primary: string
            secondary: string
            success: string
        }
    } 
}

export const light = {
    typography: {
        fonts: {
            serif: 'Playfair Display, serif',
            sansSerif: 'Raleway, sans-serif',
        },
        sizes: {
            body: '14px',
            mainHeading: '2rem'
        },
        colors: {
            primary: '#333333',
            secondary: '#8e8e8e',
            success: '#75b975',
        }
    }
}

const themes = {
    light
}

export default themes;