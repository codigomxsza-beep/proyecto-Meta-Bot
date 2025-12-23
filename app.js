const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const MetaProvider = require('@bot-whatsapp/provider/meta')
const JsonFileAdapter = require('@bot-whatsapp/database/json')

/**
 * FLOJOS
 */

const flowSecundario = addKeyword(['2', 'siguiente'])
    .addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación'])
    .addAnswer(
        [
            '📄 Aquí encuentras la documentación',
            'https://bot-whatsapp.netlify.app/',
            '\n*2* Para siguiente paso.',
        ],
        null,
        null,
        [flowSecundario]
    )

const flowTuto = addKeyword(['tutorial', 'tuto'])
    .addAnswer(
        [
            '🙌 Aquí tienes un ejemplo rápido',
            'https://bot-whatsapp.netlify.app/docs/example/',
            '\n*2* Para siguiente paso.',
        ],
        null,
        null,
        [flowSecundario]
    )

const flowGracias = addKeyword(['gracias', 'grac'])
    .addAnswer(
        [
            '🚀 Puedes apoyar este proyecto',
            '[*opencollective*] https://opencollective.com/bot-whatsapp',
            '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
            '[*patreon*] https://www.patreon.com/leifermendez',
            '\n*2* Para siguiente paso.',
        ],
        null,
        null,
        [flowSecundario]
    )

const flowDiscord = addKeyword(['discord'])
    .addAnswer(
        [
            '🤪 Únete al discord',
            'https://link.codigoencasa.com/DISCORD',
            '\n*2* Para siguiente paso.',
        ],
        null,
        null,
        [flowSecundario]
    )

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola, bienvenido a este *Chatbot*')
    .addAnswer(
        [
            'Te comparto los siguientes links de interés:',
            '👉 *doc* para ver la documentación',
            '👉 *gracias* para ver la lista de videos',
            '👉 *discord* para unirte al discord',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )

/**
 * MAIN
 */

const main = async () => {
    try {
        const adapterDB = new JsonFileAdapter()
        const adapterFlow = createFlow([flowPrincipal])

        const adapterProvider = createProvider(MetaProvider, {
            jwtToken: process.env.META_TOKEN,
            numberId: process.env.META_ID_NUMBER,
            verifyToken: process.env.META_VERIFY_TOKEN,
            version: 'v16.0',
            port: process.env.PORT || 10000,
        })

        createBot({
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        })

        console.log('✅ Bot iniciado correctamente')
    } catch (error) {
        console.error('❌ Error al iniciar el bot:', error)
    }
}

/**
 * EJECUCIÓN
 */

main()
