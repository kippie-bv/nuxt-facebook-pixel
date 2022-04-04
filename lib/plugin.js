class Fb {
    constructor(fbq, options) {
        this.options = options
        this.fbq = fbq

        this.isEnabled = !options.disabled
    }

    setPixelId(pixelId) {
        this.options.pixelId = pixelId
        this.init()
    }

    /**
     * @method enable
     */
    enable() {
        this.isEnabled = true
        this.init()
        this.track()
    }

    /**
     * @method disable
     */
    disable() {
        this.isEnabled = false
    }

    /**
     * @method init
     */
    init() {
        this.query('init', this.options.pixelId)
    }

    /**
     * @method track
     */
    track(event = null, parameters = null) {
        if (!event) {
            event = this.options.track
        }

        this.query('track', event, parameters)
    }

    /**
     * @method query
     * @param {string} cmd
     * @param {object} option
     * @param {object} parameters
     */
    query(cmd, option, parameters = null) {
        if (this.options.debug)
            log(
                'Command:',
                cmd,
                'Option:',
                option,
                'Additional parameters:',
                parameters
            )
        if (!this.isEnabled) return

        if (!parameters) {
            this.fbq(cmd, option)
        } else {
            this.fbq(cmd, option, parameters)
        }
    }
}

export default (ctx, inject) => {
    const runtimeConfig = (ctx.$config && ctx.$config.hotjar) || {}
    const moduleOptions = <%= serialize(options) %> 
    const options = {...moduleOptions, ...runtimeConfig}
    
    setTimeout(() => {
        let _fbq
        if (process.client && typeof window !== 'undefined') {
            ;((f, b, e, v, n, t, s) => {
                if (f.fbq) return
                n = f.fbq = function () {
                    n.callMethod
                        ? n.callMethod.apply(n, arguments)
                        : n.queue.push(arguments)
                }
                if (!f._fbq) f._fbq = n
                n.push = n
                n.loaded = !0
                n.version = options.version
                n.queue = []
                t = b.createElement(e)
                t.async = true
                t.defer = true
                t.src = v
                s = b.getElementsByTagName('body')[0]
                s.parentNode.appendChild(t, s)

                _fbq = fbq

                if (!options.disabled) {
                    if (options.manualMode) {
                        fbq('set', 'autoConfig', false, options.pixelId)
                    }

                    fbq('init', options.pixelId)
                    fbq('track', options.track)
                }
            })(
                window,
                document,
                'script',
                'https://connect.facebook.net/en_US/fbevents.js'
            )
        }

        const facebookPixelInstance = new Fb(_fbq, options)

        if (ctx.app && ctx.app.router) {
            const { router } = ctx.app
            router.afterEach(({ path }) => {
                if (options.autoPageView) {
                    facebookPixelInstance.track('PageView')
                }
            })
        }

        ctx.$fb = facebookPixelInstance
        inject('fb', facebookPixelInstance)
    }, options.timeout)
}
