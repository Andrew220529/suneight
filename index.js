var _main;

window.onload = function() {
    "use strict";
    (_main = new Main).init(),
    window.onresize = function() {
        onResize()
    }
    ,
    window.onunload = function() {}
}
;
var Main = function() {
    "use strict";
    function t() {
        this._scrollY = 0,
        this.isJsonReady = !1,
        this.isWorldReady = !1,
        this._world = null,
        this._enterFrameList = []
    }
    return t.prototype.init = function() {
        this._startCover = new StartCover,
        this.setUA()
    }
    ,
    t.prototype.setUAComp = function() {
        this._conf = new Config,
        this._sceneMng = new SceneMng,
        this._api = new APIMng,
        this._jsonMng = new JsonMng,
        this._jsonMng.firstLoad()
    }
    ,
    t.prototype.setJsonComp = function() {
        this._parts = new PartsLoader,
        this._parts.firstLoad()
    }
    ,
    t.prototype.partsLoadComp = function() {
        window.scrollTo(0, 0),
        this._api.setJson()
    }
    ,
    t.prototype.loadCheckJSON = function() {
        this.animationStart(),
        this.createWorld()
    }
    ,
    t.prototype.createWorld = function() {
        var t, i, e;
        this._top = new TopSet,
        this._works = new WorksSet,
        this._member = new MemberSet,
        this._about = new AboutSet,
        this._recruit = new RecruitSet,
        this._ring = new LoadingRing,
        "PC" !== this._device ? (i = document.getElementById("footer"),
        document.body.removeChild(i),
        e = document.getElementById("under-header"),
        document.body.removeChild(e),
        this._footerSp = new FooterSpSet,
        this._header = new UnderHeaderSp) : (t = document.getElementById("sp-filter"),
        document.body.removeChild(t),
        i = document.getElementById("sp-menu"),
        document.body.removeChild(i),
        t = document.getElementById("under-page"),
        i = document.getElementById("footer-sp"),
        t.removeChild(i),
        e = document.getElementById("under-header-sp"),
        document.body.removeChild(e),
        this._header = new UnderHeader,
        this._footer = new FooterSet),
        this._world = new CanvasWorld,
        this._world.init()
    }
    ,
    t.prototype.contentsStart = function() {
        this._startCover.hide(),
        this._sceneMng.contentsStart(),
        this._world.contentsStart(),
        this._top.contentsStart(),
        this._header.contentsStart(),
        "PC" !== this._device && this._footerSp.contentsStart(),
        onResize()
    }
    ,
    t.prototype.changeMode = function(t) {
        this._top.changeMode(t),
        this._world.changeMode(t),
        this._footer && this._footer.changeMode(t)
    }
    ,
    t.prototype.addEnterFrame = function(t, i) {
        i = {
            _target: t,
            _function: i
        };
        this._enterFrameList.push(i)
    }
    ,
    t.prototype.removeEnterFrame = function(t) {
        this.isFrameLock = !0;
        for (var i = this._enterFrameList.length, e = -1, s = 0; s < i; s++)
            if (this._enterFrameList[s]._target === t) {
                e = s;
                break
            }
        -1 !== e && this._enterFrameList.splice(e, 1),
        this.isFrameLock = !1
    }
    ,
    t.prototype.animationStart = function() {
        void 0 !== window.requestAnimationFrame ? _main.animationType1() : _main.animationType2()
    }
    ,
    t.prototype.animationType1 = function() {
        this.animationLoop(),
        this._anim = requestAnimationFrame(function() {
            _main.animationType1()
        })
    }
    ,
    t.prototype.animationType2 = function() {
        this.animationLoop(),
        this._anim = setTimeout(function() {
            _main.animationType2b()
        }, 20)
    }
    ,
    t.prototype.animationType2b = function() {
        _main.animationType2()
    }
    ,
    t.prototype.animationLoop = function() {
        if (!this.isFrameLock)
            for (var t = this._enterFrameList.length, i = 0; i < t; i++)
                void 0 !== this._enterFrameList[i] && this._enterFrameList[i]._target[this._enterFrameList[i]._function]()
    }
    ,
    t.prototype.setUA = function() {
        var t = document.createElement("canvas").getContext("experimental-webgl");
        this._ua = new GLOBAL.WebModule.UserAgent,
        this._device = "PC",
        this._version = 0,
        this._webGL = !!window.WebGLRenderingContext && !!t;
        var i = Math.min(window.screen.width, window.screen.height)
          , t = i / Math.max(window.screen.width, window.screen.height);
        this._device = i < 600 ? "SP" : .68 <= t && t <= .76 ? "TB" : "PC",
        this._webGL ? _main.setUAComp() : location.href = "/old/"
    }
    ,
    t
}()
  , _resizeList = [];
function addResize(t) {
    "use strict";
    _resizeList.push(t)
}
function removeResize(t) {
    "use strict";
    for (var i = [], e = 0; e < _resizeList.length; e++)
        _resizeList[e] !== t && i.push(_resizeList[e]);
    for (_resizeList = [],
    e = 0; e < i.length; e++)
        _resizeList.push(i[e])
}
function onResize() {
    "use strict";
    for (var t = 0; t < _resizeList.length; t++)
        _resizeList[t].onResize()
}
var MapLogo = function() {
    function t() {
        this.init()
    }
    return t.prototype.init = function() {
        for (this._bc = new Beacon,
        this._group = new THREE.Object3D,
        _main._world._scene.add(this._group),
        this._shiftY = 120,
        "PC" !== _main._device && ("SP" === _main._device ? this._shiftY = 60 : this._shiftY = 150),
        this._line1 = new MapLogoLine({
            parent: this,
            vnum: 7,
            type: 0
        }),
        this._line2 = new MapLogoLine({
            parent: this,
            vnum: 4,
            type: 1
        }),
        this._line3 = new MapLogoLine({
            parent: this,
            vnum: 4,
            type: 1
        }),
        this._line5 = new MapLogoLine({
            parent: this,
            vnum: 4,
            type: 1
        }),
        this._vList = [],
        this._pGeo = new THREE.Geometry,
        o = 0; o < 5; o++) {
            this._pGeo.vertices[o] = new THREE.Vector3(0,0,0);
            var t = new PVertex(this,this._pGeo.vertices[o]);
            this._vList.push(t)
        }
        this._pMat = new THREE.PointsMaterial({
            size: 2,
            map: _main._parts.getTex("assets/image/particle.png"),
            transparent: !0,
            opacity: .6,
            blending: THREE.AdditiveBlending
        }),
        this._point = new THREE.Points(this._pGeo,this._pMat),
        this._group.add(this._point);
        var i = .85;
        window.parent.screen.width < 1700 && (i = .72),
        "PC" !== _main._device && (i = .5),
        this._geo1 = new THREE.PlaneBufferGeometry(192 * i,192 * i,2,2),
        this._geo2 = new THREE.PlaneBufferGeometry(162 * i,162 * i,2,2),
        this._logoR1 = 192 * i * .5,
        this._logoR2 = 162 * i * .5;
        var e = ["assets/image/logos/logo0.png", "assets/image/logos/logo1.png", "assets/image/logos/logo2.png", "assets/image/logos/logo3.png", "assets/image/logos/logo4.png", "assets/image/logos/logo5.png", "assets/image/logos/logo6.png", "assets/image/logos/logo7.png", "assets/image/logos/logo8.png"];
        for (this._matList = [],
        o = 0; o < 9; o++) {
            var s = new THREE.ShaderMaterial({
                vertexShader: _main._parts.getShader("assets/shader/mLogo_vtx.js"),
                fragmentShader: _main._parts.getShader("assets/shader/mLogo_frg.js"),
                uniforms: {
                    texture: {
                        value: _main._parts.getTex(e[o])
                    },
                    isColor: {
                        value: 0
                    }
                },
                transparent: !0,
                depthTest: !1
            });
            this._matList.push(s)
        }
        for (this._logo0 = new THREE.Mesh(this._geo1,this._matList[0]),
        this._logo1 = new THREE.Mesh(this._geo2,this._matList[1]),
        this._logo2 = new THREE.Mesh(this._geo2,this._matList[2]),
        this._logo3 = new THREE.Mesh(this._geo2,this._matList[3]),
        this._logo4 = new THREE.Mesh(this._geo2,this._matList[4]),
        this._logo5 = new THREE.Mesh(this._geo2,this._matList[5]),
        this._logo6 = new THREE.Mesh(this._geo2,this._matList[6]),
        this._logo7 = new THREE.Mesh(this._geo2,this._matList[7]),
        this._logo8 = new THREE.Mesh(this._geo2,this._matList[8]),
        this._group.add(this._logo0),
        this._group.add(this._logo1),
        this._group.add(this._logo2),
        this._group.add(this._logo3),
        this._group.add(this._logo4),
        this._group.add(this._logo6),
        this._group.add(this._logo8),
        this._logoList = [this._logo0, this._logo1, this._logo2, this._logo3, this._logo4, this._logo6, this._logo8, this._logo5],
        this._mOverList = [this._logo1, this._logo2, this._logo3, this._logo4, this._logo6, this._logo8],
        this._linePList = [[this._logo0, this._logo1], [this._logo0, this._logo2], [this._logo0, this._logo3], [this._logo0, this._logo4], [this._logo0, this._logo6], [this._logo0, this._logo8], [this._logo1, this._logo2], [this._logo2, this._logo3], [this._logo3, this._logo4], [this._logo8, this._logo1]],
        this._wr = 460,
        this._hr = 260,
        this._rr = -60,
        window.parent.screen.width < 1700 && (this._wr = 391,
        this._hr = 221),
        "PC" !== _main._device && ("SP" === _main._device ? (this._wr = 180,
        this._hr = 135) : (this._wr = 400 * .55,
        this._hr = 150)),
        this._rotationList = [0],
        o = 1; o < this._logoList.length; o++) {
            var h = 180 + Math.ceil(8 * Math.random() - 4) + this._rr * (o - 1);
            this._rotationList.push(h);
            var a = Math.cos(h * Math.PI / 180) * this._wr
              , h = Math.sin(h * Math.PI / 180) * this._hr;
            this._logoList[o].position.x = a,
            this._logoList[o].position.y = h
        }
        i = [this._logo1, this._logo2, this._logo3, this._logo4, this._logo6, this._logo8, this._logo1];
        this._line1.setTarget(i);
        i = [this._logo0, this._logo1, this._logo3, this._logo0];
        this._line2.setTarget(i);
        i = [this._logo0, this._logo2, this._logo4, this._logo0];
        this._line3.setTarget(i);
        i = [this._logo0, this._logo8, this._logo6, this._logo0];
        this._line5.setTarget(i);
        for (var o = 0; o < this._vList.length; o++)
            this._vList[o].getTarget();
        _main.addEnterFrame(this, "enterFrame"),
        "PC" === _main._device && (this.isHit = !1,
        this._mouseoverList = [0, 0, 0, 0, 0, 0, 0, 0, 0],
        this._bc.set(this, "mouseFrame"));
        var n = this;
        "PC" === _main._device ? document.addEventListener("click", function(t) {
            n.clickCheck(t)
        }, !1) : (i = document.getElementById("about-map-area"),
        $(i).on("click", function(t) {
            n.clickCheck(t)
        })),
        this._mapShiftY = 0,
        "SP" == _main._device && (window.innerHeight < 680 ? this._mapShiftY = 0 : this._mapShiftY = 100)
    }
    ,
    t.prototype.clickCheck = function(t) {
        for (var i = (_main._device,
        e = t.pageX,
        t.pageY), t = $(window).scrollTop(), e = e - .5 * $(window).width(), t = i - t - .5 * $(window).height(), s = e - this._group.position.x, h = -t - this._group.position.y, a = 1; a < this._logoList.length; a++) {
            var o = this._logoList[a].position.x
              , n = this._logoList[a].position.y;
            if (Math.abs(s - o) < this._logoR2 && Math.abs(h - n) < this._logoR2) {
                _main._sceneMng.pageSlide("works");
                break
            }
        }
    }
    ,
    t.prototype.popUp = function(i) {
        $.ajax({
            type: "GET",
            url: "/assets/json/member.json",
            cache: !1,
            dataType: "json",
            async: !1,
            success: function(t) {
                t.success && window.open(i)
            }
        })
    }
    ,
    t.prototype.enterFrame = function() {
        var t;
        for (this._baseY = $("#about").offset().top - _main._world._scrollTop,
        this._scrollY = -this._baseY + this._shiftY,
        this._group.position.y = this._scrollY + this._mapShiftY,
        t = 1; t < this._logoList.length; t++) {
            this._rotationList[t] = (this._rotationList[t] - .1) % 360;
            var i = Math.cos(this._rotationList[t] * Math.PI / 180) * this._wr
              , e = Math.sin(this._rotationList[t] * Math.PI / 180) * this._hr;
            this._logoList[t].position.x = i,
            this._logoList[t].position.y = e
        }
        for (t = 0; t < this._vList.length; t++)
            this._vList[t].enterFrame();
        this._pGeo.verticesNeedUpdate = !0
    }
    ,
    t.prototype.mouseFrame = function() {
        for (var t = _main._world._pageX - this._group.position.x, i = -_main._world._pageY - this._group.position.y, e = 0; e < this._mOverList.length; e++) {
            var s = this._mOverList[e].position.x
              , h = this._mOverList[e].position.y;
            Math.abs(t - s) < this._logoR2 && Math.abs(i - h) < this._logoR2 ? (this._mouseoverList[e] = 1,
            this._mOverList[e].material.uniforms.isColor.value = 1,
            this._mOverList[e].scale.x = .8 * this._mOverList[e].scale.x + .24) : (this._mouseoverList[e] = 0,
            this._mOverList[e].material.uniforms.isColor.value = 0,
            this._mOverList[e].scale.x = .8 * this._mOverList[e].scale.x + .2),
            this._mOverList[e].scale.y = this._mOverList[e].scale.x
        }
        for (var a = 0, e = 0; e < this._mouseoverList.length; e++)
            a += this._mouseoverList[e];
        0 < a ? this.isHit || (this.isHit = !0,
        document.body.style.cursor = "pointer") : this.isHit && (this.isHit = !1,
        document.body.style.cursor = "default")
    }
    ,
    t.prototype.getPTarget = function() {
        var t = this._linePList;
        return t[Math.floor(Math.random() * t.length)]
    }
    ,
    t
}()
  , PVertex = function() {
    function t(t, i) {
        this._speedA = .88 + .1 * +Math.random(),
        this._speedB = 1 - this._speedA,
        this._targetA = null,
        this._targetB = null,
        this._parent = t,
        this._v = i
    }
    return t.prototype.getTarget = function() {
        this._speedA = .89 + .9 * Math.random() * .1,
        this._speedB = 1 - this._speedA;
        var t = this._parent.getPTarget();
        10 * Math.random() < 5 ? (this._targetA = t[0],
        this._targetB = t[1]) : (this._targetA = t[1],
        this._targetB = t[0]),
        this._v.x = this._targetA.position.x,
        this._v.y = this._targetA.position.y,
        this._speed = Math.ceil(40 * Math.random()) + 60,
        this._count = 0
    }
    ,
    t.prototype.enterFrame = function() {
        var t, i;
        null != this._targetA && (this._count++,
        t = this._targetB.position.x - this._targetA.position.x,
        i = this._targetB.position.y - this._targetA.position.y,
        t = t / this._speed * this._count,
        i = i / this._speed * this._count,
        this._v.x = this._targetA.position.x + t,
        this._v.y = this._targetA.position.y + i,
        this._count >= this._speed && this.getTarget())
    }
    ,
    t
}()
  , MapLogoLine = function() {
    "use strict";
    function t(t) {
        this._parent = t.parent,
        this._vNum = t.vnum,
        this._type = t.type,
        this._alpha = .5,
        this._frameCount = 0,
        this._bc = new Beacon,
        this.init()
    }
    return t.prototype.init = function() {
        this._geo = new THREE.BufferGeometry;
        var t = new Float32Array(3 * this._vNum)
          , i = new Float32Array(3 * this._vNum);
        for (this._uniPos = [],
        s = 0; s < 3 * this._vNum; s += 3)
            t[s] = 1e3 * Math.random() - 500,
            t[s + 1] = 600 * Math.random() - 300,
            t[s + 2] = 0,
            i[s] = 1,
            i[s + 1] = 1,
            i[s + 2] = 1,
            this._uniPos[s] = t[s],
            this._uniPos[s + 1] = t[s + 1],
            this._uniPos[s + 2] = 0;
        this._geo.addAttribute("position", new THREE.BufferAttribute(t,3)),
        this._geo.addAttribute("color", new THREE.BufferAttribute(i,3));
        for (var e = new Float32Array(this._vNum), s = 0; s < this._vNum; s++)
            e[s] = s;
        this._geo.addAttribute("id", new THREE.BufferAttribute(e,1)),
        0 < this._type && Math.floor(10 * Math.random()) < 5 && (this._alpha = .3),
        this._mat = new THREE.ShaderMaterial({
            vertexShader: _main._parts.getShader("assets/shader/map_line_vtx.js"),
            fragmentShader: _main._parts.getShader("assets/shader/map_line_frg.js"),
            uniforms: {
                alpha: {
                    value: this._alpha
                },
                newPos: {
                    value: this._uniPos
                }
            },
            transparent: !0,
            depthTest: !1
        }),
        this._line = new THREE.Line(this._geo,this._mat),
        this._parent._group.add(this._line)
    }
    ,
    t.prototype.setTarget = function(t) {
        this._targetList = t,
        _main.addEnterFrame(this, "enterFrame")
    }
    ,
    t.prototype.enterFrame = function() {
        for (var t = 0, i = 0, t = 0; t < 3 * this._vNum; t += 3)
            this._uniPos[t] = this._targetList[i].position.x,
            this._uniPos[t + 1] = this._targetList[i].position.y,
            this._uniPos[t + 2] = 0,
            i++;
        0 !== this._type && (this._frameCount++,
        60 < this._frameCount && (this._frameCount = 0,
        this.checkBring()))
    }
    ,
    t.prototype.checkBring = function() {
        this._bc.clear(),
        Math.floor(10 * Math.random()) < 5 ? this._bc.set(this, "bringFrame1") : this._bc.set(this, "bringFrame2")
    }
    ,
    t.prototype.bringFrame1 = function() {
        this._alpha = .95 * this._alpha + .1 * .05,
        this._mat.uniforms.alpha.value = this._alpha,
        Math.abs(this._alpha - .1) < .01 && this._bc.clear()
    }
    ,
    t.prototype.bringFrame2 = function() {
        this._alpha = .95 * this._alpha + .4 * .05,
        this._mat.uniforms.alpha.value = this._alpha,
        Math.abs(this._alpha - .4) < .01 && this._bc.clear()
    }
    ,
    t
}()
  , MapSet = function() {
    "use strict";
    function t() {
        this.init()
    }
    return t.prototype.init = function() {
        var t;
        this._scrollSpeed = .97,
        this._moveY = 1,
        this._sCount = -1,
        this._baseY = $("#about").offset().top,
        "PC" === _main._device ? (this._width = 200,
        this._height = 140,
        this._bai = 8,
        this._scale = $(window).width() / 1600) : (this._width = 200,
        this._height = 140,
        this._bai = 8,
        this._scale = $(window).width() / 1600 * 1.8),
        this._image = _main._parts.getImage("assets/image/map.png"),
        this._canvas = document.createElement("canvas"),
        this._canvas.width = this._width,
        this._canvas.height = this._height,
        this._ctx = this._canvas.getContext("2d"),
        this._ctx.drawImage(this._image, 0, 0, this._width, this._height);
        var i = this._ctx.getImageData(0, 0, this._width, this._height).data;
        for (this._ww = this._width,
        this._hh = this._height,
        this._total = this._ww * this._hh,
        this._list = [],
        t = 0; t < i.length; t += 4)
            128 <= i[t] ? this._list.push(1) : this._list.push(0);
        this._geo = new THREE.BufferGeometry;
        var e = []
          , s = []
          , h = []
          , a = []
          , o = []
          , n = []
          , _ = []
          , r = []
          , l = [];
        this._morphList = [[.9, 1 - .9], [.91, 1 - .91], [.925, 1 - .925], [.955, 1 - .955], [.97, 1 - .97]];
        for (this._cityPos = [],
        t = 0; t < this._list.length; t++) {
            var p, d, m, c = t % this._ww * this._bai - this._width * this._bai * .5, u = Math.floor(t / -this._ww) * this._bai + this._height * this._bai * .5 - 50;
            1 === this._list[t] && (e.push(t),
            p = c,
            d = u,
            m = 3 * Math.random() + 3.5,
            "PC" !== _main._device && (m = .5),
            s.push(p),
            s.push(d),
            s.push(0),
            h.push(m),
            a.push(.4 * Math.random() + .6),
            o.push(4 * Math.random()),
            _.push(Math.floor(t / this._ww)),
            r.push(Math.floor(512 * Math.random()) / 512),
            r.push(Math.floor(512 * Math.random()) / 512),
            l.push(Math.floor(5 * Math.random())),
            n.push(2 * Math.random() - 1)),
            16518 !== t && 16705 !== t && 16898 !== t && 20615 !== t || this._cityPos.push({
                x: c,
                y: u
            })
        }
        this.isRing = !0;
        var g = new Float32Array(e);
        this._geo.addAttribute("id", new THREE.BufferAttribute(g,1));
        g = new Float32Array(h);
        this._geo.addAttribute("size", new THREE.BufferAttribute(g,1));
        g = new Float32Array(a);
        this._geo.addAttribute("alpha", new THREE.BufferAttribute(g,1));
        g = new Float32Array(o);
        this._geo.addAttribute("rndm", new THREE.BufferAttribute(g,1));
        g = new Float32Array(n);
        this._geo.addAttribute("rndm2", new THREE.BufferAttribute(g,1));
        g = new Float32Array(_);
        this._geo.addAttribute("line", new THREE.BufferAttribute(g,1));
        g = new Float32Array(s);
        this._geo.addAttribute("position", new THREE.BufferAttribute(g,3));
        g = new Float32Array(r);
        this._geo.addAttribute("puv", new THREE.BufferAttribute(g,2));
        g = new Float32Array(l);
        this._geo.addAttribute("morphIdx", new THREE.BufferAttribute(g,1)),
        this._pCount = 0,
        this._sin = 0,
        this._scrollY = -1e4,
        this._morph = [1, 1, 1, 1, 1],
        this._pitch = .25 * $(window).width(),
        this._shader = {
            vertexShader: _main._parts.getShader("assets/shader/map_vtx.js"),
            fragmentShader: _main._parts.getShader("assets/shader/map_frg.js"),
            uniforms: {
                texture: {
                    value: _main._parts.getTex("assets/image/particle.png")
                },
                noiseTex: {
                    value: null
                },
                count: {
                    value: this._count
                },
                scrollY: {
                    value: this._scrollY
                },
                scrollBarY: {
                    value: 0
                },
                scale: {
                    value: this._scale
                },
                isMap: {
                    value: 0
                },
                morph: {
                    value: this._morph
                },
                pageH: {
                    value: $(document).height()
                },
                sCount: {
                    value: this._sCount
                },
                pitch: {
                    value: this._pitch
                }
            },
            transparent: !0,
            depthTest: !1,
            blending: THREE.AdditiveBlending
        },
        this._mat = new THREE.ShaderMaterial(this._shader),
        this._mat.extensions.derivatives = !0,
        this._mesh = new THREE.Points(this._geo,this._mat),
        _main._world._scene.add(this._mesh),
        this._cityGeo = new THREE.PlaneGeometry(26.8,26.8,2,2),
        this._cityMat1 = new THREE.MeshBasicMaterial({
            transparent: !0,
            opacity: .7,
            map: _main._parts.getTex("assets/image/city.png"),
            depthTest: !1
        }),
        this._cityMat2 = new THREE.MeshBasicMaterial({
            transparent: !0,
            opacity: .7,
            map: _main._parts.getTex("assets/image/city_ring.png"),
            depthTest: !1
        }),
        this._nameGeo = new THREE.PlaneGeometry(80,17.6,2,2),
        this._nameMat1 = new THREE.MeshBasicMaterial({
            transparent: !0,
            depthTest: !1,
            opacity: .7,
            map: _main._parts.getTex("assets/image/map_tokyo.png")
        }),
        this._nameMat1b = new THREE.MeshBasicMaterial({
            transparent: !0,
            depthTest: !1,
            opacity: .7,
            map: _main._parts.getTex("assets/image/map_nagoya.png")
        }),
        this._nameMat2 = new THREE.MeshBasicMaterial({
            transparent: !0,
            depthTest: !1,
            opacity: .7,
            map: _main._parts.getTex("assets/image/map_osaka.png")
        }),
        this._nameMat3 = new THREE.MeshBasicMaterial({
            transparent: !0,
            depthTest: !1,
            opacity: .7,
            map: _main._parts.getTex("assets/image/map_china.png")
        }),
        this._tokyo = new THREE.Object3D,
        _main._world._scene.add(this._tokyo),
        this._tokyoC = new THREE.Mesh(this._cityGeo,this._cityMat1),
        this._tokyo.add(this._tokyoC),
        this._tokyoR = new THREE.Mesh(this._cityGeo,this._cityMat2),
        this._tokyo.add(this._tokyoR),
        this._tokyoN = new THREE.Mesh(this._nameGeo,this._nameMat1),
        this._tokyoN.position.y = 30,
        this._tokyo.add(this._tokyoN),
        this._nagoya = new THREE.Object3D,
        _main._world._scene.add(this._nagoya),
        this._nagoyaC = new THREE.Mesh(this._cityGeo,this._cityMat1),
        this._nagoya.add(this._nagoyaC),
        this._nagoyaR = new THREE.Mesh(this._cityGeo,this._cityMat2),
        this._nagoya.add(this._nagoyaR),
        this._nagoyaN = new THREE.Mesh(this._nameGeo,this._nameMat1b),
        this._nagoyaN.position.y = -30,
        this._nagoya.add(this._nagoyaN),
        this._osaka = new THREE.Object3D,
        _main._world._scene.add(this._osaka),
        this._osakaC = new THREE.Mesh(this._cityGeo,this._cityMat1),
        this._osaka.add(this._osakaC),
        this._osakaR = new THREE.Mesh(this._cityGeo,this._cityMat2),
        this._osaka.add(this._osakaR),
        this._osakaN = new THREE.Mesh(this._nameGeo,this._nameMat2),
        this._osakaN.position.y = 30,
        this._osaka.add(this._osakaN),
        this._china = new THREE.Object3D,
        _main._world._scene.add(this._china),
        this._chinaC = new THREE.Mesh(this._cityGeo,this._cityMat1),
        this._china.add(this._chinaC),
        this._chinaR = new THREE.Mesh(this._cityGeo,this._cityMat2),
        this._china.add(this._chinaR),
        this._chinaN = new THREE.Mesh(this._nameGeo,this._nameMat3),
        this._chinaN.position.y = 30,
        this._china.add(this._chinaN),
        this._shiftY = 120,
        "PC" !== _main._device && ("SP" === _main._device ? this._shiftY = 60 : this._shiftY = 150,
        this._tokyo.scale.set(.5, .5, .5),
        this._nagoya.scale.set(.5, .5, .5),
        this._osaka.scale.set(.5, .5, .5),
        this._china.scale.set(.5, .5, .5)),
        addResize(this),
        this.onResize()
    }
    ,
    t.prototype.contentsStart = function() {
        this._shader.uniforms.noiseTex.value = _main._world._noise._render.texture,
        _main.addEnterFrame(this, "enterFrame")
    }
    ,
    t.prototype.enterFrame = function() {
        this._baseY = $("#about").offset().top - _main._world._scrollTop;
        var t, i = -this._baseY + this._shiftY;
        if (_main._sceneMng.isMap)
            for (this._moveY = 1,
            this._scrollSpeed = .95 * this._scrollSpeed + .4 * .05,
            t = 0; t < this._morph.length; t++)
                this._morph[t] = this._morph[t] * this._morphList[t][0] + 0 * this._morphList[t][1];
        else
            for (this._moveY = .995 * this._moveY + .00495,
            this._scrollSpeed = .95 * this._scrollSpeed + .0495,
            t = 0; t < this._morph.length; t++)
                this._morph[t] = this._morph[t] * this._moveY + (1 - this._moveY);
        this._shader.uniforms.morph.value = this._morph;
        var e = 7e-4 * _main._world._scrollTop;
        1 <= e && (e = 1),
        this._shader.uniforms.scrollBarY.value = e,
        this._scrollY = this._scrollY * this._scrollSpeed + i * (1 - this._scrollSpeed),
        this._shader.uniforms.scrollY.value = this._scrollY,
        this.aboutFrame()
    }
    ,
    t.prototype.aboutFrame = function() {
        this._pCount = this._pCount + 1.4,
        36e4 <= this._pCount && (this._pCount = 0),
        this._shader.uniforms.count.value = this._pCount,
        this._shader.uniforms.scale.value = this._scale,
        this._shader.uniforms.pageH.value = $(document).height(),
        this._shader.uniforms.pitch.value = .25 * $(window).width(),
        this._sCount += .01,
        1 <= this._sCount && (this._sCount = -1),
        this._shader.uniforms.sCount.value = this._sCount,
        this._tokyo.position.x = this._cityPos[0].x * this._scale,
        this._tokyo.position.y = this._cityPos[0].y * this._scale + this._scrollY,
        this._nagoya.position.x = this._cityPos[1].x * this._scale,
        this._nagoya.position.y = this._cityPos[1].y * this._scale + this._scrollY,
        this._osaka.position.x = this._cityPos[2].x * this._scale,
        this._osaka.position.y = this._cityPos[2].y * this._scale + this._scrollY,
        this._china.position.x = this._cityPos[3].x * this._scale,
        this._china.position.y = this._cityPos[3].y * this._scale + this._scrollY,
        this.isRing && (this._tokyoR.scale.x = .95 * this._tokyoR.scale.x + 1.8 * .05,
        this._tokyoR.scale.y = this._tokyoR.scale.x,
        this._nagoyaR.scale.x = this._nagoyaR.scale.y = this._tokyoR.scale.x,
        this._osakaR.scale.x = this._osakaR.scale.y = this._tokyoR.scale.x,
        this._chinaR.scale.x = this._chinaR.scale.y = this._tokyoR.scale.x,
        this._cityMat2.opacity = .95 * this._cityMat2.opacity + 0,
        Math.abs(+this._cityMat2.opacity) < .01 && (this.isRing = !1,
        this._tokyoR.scale.x = .5,
        this._tokyoR.scale.y = .5,
        this._nagoyaR.scale.x = .5,
        this._nagoyaR.scale.y = .5,
        this._osakaR.scale.x = .5,
        this._osakaR.scale.y = .5,
        this._chinaR.scale.x = .5,
        this._chinaR.scale.y = .5,
        this._cityMat2.opacity = 1,
        this.isRing = !0))
    }
    ,
    t.prototype.onResize = function() {
        "PC" === _main._device ? this._scale = $(window).width() / 1600 : this._scale = $(window).width() / 1600 * 1.8
    }
    ,
    t
}()
  , MapSetSP = function() {
    "use strict";
    function t() {
        this.init()
    }
    return t.prototype.init = function() {
        var t;
        this._baseY = $("#about").offset().top,
        "PC" === _main._device ? (this._width = 200,
        this._height = 140,
        this._bai = 8,
        this._scale = $(window).width() / 1600) : (this._width = 200,
        this._height = 140,
        this._bai = 8,
        this._scale = $(window).width() / 1600 * 1.8),
        this._image = _main._parts.getImage("assets/image/map.png"),
        this._canvas = document.createElement("canvas"),
        this._canvas.width = this._width,
        this._canvas.height = this._height,
        this._ctx = this._canvas.getContext("2d"),
        this._ctx.drawImage(this._image, 0, 0, this._width, this._height);
        var i = this._ctx.getImageData(0, 0, this._width, this._height).data;
        for (this._ww = this._width,
        this._hh = this._height,
        this._total = this._ww * this._hh,
        this._list = [],
        t = 0; t < i.length; t += 4)
            128 <= i[t] ? this._list.push(1) : this._list.push(0);
        this._geo = new THREE.BufferGeometry;
        var e = []
          , s = []
          , h = []
          , a = []
          , o = []
          , n = [];
        for (this._cityPos = [],
        t = 0; t < this._list.length; t++) {
            var _, r, l, p = t % this._ww * this._bai - this._width * this._bai * .5, d = Math.floor(t / -this._ww) * this._bai + this._height * this._bai * .5 - 50;
            1 === this._list[t] && (e.push(t),
            _ = p,
            r = d,
            l = 3 * Math.random() + 3.5,
            "PC" !== _main._device && (l = .5),
            s.push(_),
            s.push(r),
            s.push(0),
            h.push(l),
            a.push(.4 * Math.random() + .6),
            o.push(4 * Math.random()),
            n.push(Math.floor(t / this._ww))),
            16518 !== t && 16705 !== t && 16898 !== t && 20615 !== t || this._cityPos.push({
                x: p,
                y: d
            })
        }
        this.isRing = !0;
        var m = new Float32Array(e);
        this._geo.addAttribute("id", new THREE.BufferAttribute(m,1));
        m = new Float32Array(h);
        this._geo.addAttribute("size", new THREE.BufferAttribute(m,1));
        m = new Float32Array(a);
        this._geo.addAttribute("alpha", new THREE.BufferAttribute(m,1));
        m = new Float32Array(o);
        this._geo.addAttribute("rndm", new THREE.BufferAttribute(m,1));
        m = new Float32Array(n);
        this._geo.addAttribute("line", new THREE.BufferAttribute(m,1));
        m = new Float32Array(s);
        this._geo.addAttribute("position", new THREE.BufferAttribute(m,3)),
        this._pCount = 0,
        this._sin = 0,
        this._scrollY = 0,
        this._shader = {
            vertexShader: _main._parts.getShader("assets/shader/map_sp_vtx.js"),
            fragmentShader: _main._parts.getShader("assets/shader/map_frg.js"),
            uniforms: {
                texture: {
                    value: _main._parts.getTex("assets/image/particle.png")
                },
                count: {
                    value: this._count
                },
                scrollY: {
                    value: this._scrollY
                },
                scale: {
                    value: this._scale
                }
            },
            transparent: !0,
            depthTest: !1,
            blending: THREE.AdditiveBlending
        },
        this._mat = new THREE.ShaderMaterial(this._shader),
        this._mesh = new THREE.Points(this._geo,this._mat),
        _main._world._scene.add(this._mesh),
        this._cityGeo = new THREE.PlaneGeometry(26.8,26.8,2,2),
        this._cityMat1 = new THREE.MeshBasicMaterial({
            transparent: !0,
            opacity: .7,
            map: _main._parts.getTex("assets/image/city.png"),
            depthTest: !1
        }),
        this._cityMat2 = new THREE.MeshBasicMaterial({
            transparent: !0,
            opacity: .7,
            map: _main._parts.getTex("assets/image/city_ring.png"),
            depthTest: !1
        }),
        this._nameGeo = new THREE.PlaneGeometry(80,17.6,2,2),
        this._nameMat1 = new THREE.MeshBasicMaterial({
            transparent: !0,
            depthTest: !1,
            opacity: .7,
            map: _main._parts.getTex("assets/image/map_tokyo.png")
        }),
        this._nameMat1b = new THREE.MeshBasicMaterial({
            transparent: !0,
            depthTest: !1,
            opacity: .7,
            map: _main._parts.getTex("assets/image/map_nagoya.png")
        }),
        this._nameMat2 = new THREE.MeshBasicMaterial({
            transparent: !0,
            depthTest: !1,
            opacity: .7,
            map: _main._parts.getTex("assets/image/map_osaka.png")
        }),
        this._nameMat3 = new THREE.MeshBasicMaterial({
            transparent: !0,
            depthTest: !1,
            opacity: .7,
            map: _main._parts.getTex("assets/image/map_china.png")
        }),
        this._tokyo = new THREE.Object3D,
        _main._world._scene.add(this._tokyo),
        this._tokyoC = new THREE.Mesh(this._cityGeo,this._cityMat1),
        this._tokyo.add(this._tokyoC),
        this._tokyoR = new THREE.Mesh(this._cityGeo,this._cityMat2),
        this._tokyo.add(this._tokyoR),
        this._tokyoN = new THREE.Mesh(this._nameGeo,this._nameMat1),
        this._tokyoN.position.y = 30,
        this._tokyo.add(this._tokyoN),
        this._nagoya = new THREE.Object3D,
        _main._world._scene.add(this._nagoya),
        this._nagoyaC = new THREE.Mesh(this._cityGeo,this._cityMat1),
        this._nagoya.add(this._nagoyaC),
        this._nagoyaR = new THREE.Mesh(this._cityGeo,this._cityMat2),
        this._nagoya.add(this._nagoyaR),
        this._nagoyaN = new THREE.Mesh(this._nameGeo,this._nameMat1b),
        this._nagoyaN.position.y = -30,
        this._nagoya.add(this._nagoyaN),
        this._osaka = new THREE.Object3D,
        _main._world._scene.add(this._osaka),
        this._osakaC = new THREE.Mesh(this._cityGeo,this._cityMat1),
        this._osaka.add(this._osakaC),
        this._osakaR = new THREE.Mesh(this._cityGeo,this._cityMat2),
        this._osaka.add(this._osakaR),
        this._osakaN = new THREE.Mesh(this._nameGeo,this._nameMat2),
        this._osakaN.position.y = 30,
        this._osaka.add(this._osakaN),
        this._china = new THREE.Object3D,
        _main._world._scene.add(this._china),
        this._chinaC = new THREE.Mesh(this._cityGeo,this._cityMat1),
        this._china.add(this._chinaC),
        this._chinaR = new THREE.Mesh(this._cityGeo,this._cityMat2),
        this._china.add(this._chinaR),
        this._chinaN = new THREE.Mesh(this._nameGeo,this._nameMat3),
        this._chinaN.position.y = 30,
        this._china.add(this._chinaN),
        this._shiftY = 180,
        "PC" !== _main._device && ("SP" === _main._device ? this._shiftY = 60 : this._shiftY = 150,
        this._tokyo.scale.set(.5, .5, .5),
        this._nagoya.scale.set(.5, .5, .5),
        this._osaka.scale.set(.5, .5, .5),
        this._china.scale.set(.5, .5, .5)),
        this._mapShiftY = 0,
        "SP" == _main._device && (window.innerHeight < 680 ? this._mapShiftY = 0 : this._mapShiftY = 100),
        addResize(this),
        this.onResize(),
        _main.addEnterFrame(this, "enterFrame")
    }
    ,
    t.prototype.enterFrame = function() {
        this.aboutFrame()
    }
    ,
    t.prototype.aboutFrame = function() {
        this._pCount = this._pCount + 1.2,
        36e4 <= this._pCount && (this._pCount = 0),
        this._shader.uniforms.count.value = this._pCount,
        this._baseY = $("#about").offset().top - _main._world._scrollTop,
        this._scrollY = -this._baseY + this._shiftY,
        this._shader.uniforms.scrollY.value = this._scrollY + this._mapShiftY,
        this._shader.uniforms.scale.value = this._scale,
        this._tokyo.position.x = this._cityPos[0].x * this._scale,
        this._tokyo.position.y = this._cityPos[0].y * this._scale + this._scrollY + this._mapShiftY,
        this._nagoya.position.x = this._cityPos[1].x * this._scale,
        this._nagoya.position.y = this._cityPos[1].y * this._scale + this._scrollY + this._mapShiftY,
        this._osaka.position.x = this._cityPos[2].x * this._scale,
        this._osaka.position.y = this._cityPos[2].y * this._scale + this._scrollY + this._mapShiftY,
        this._china.position.x = this._cityPos[3].x * this._scale,
        this._china.position.y = this._cityPos[3].y * this._scale + this._scrollY + this._mapShiftY,
        this.isRing && (this._tokyoR.scale.x = .95 * this._tokyoR.scale.x + 1.8 * .05,
        this._tokyoR.scale.y = this._tokyoR.scale.x,
        this._nagoyaR.scale.x = this._nagoyaR.scale.y = this._tokyoR.scale.x,
        this._osakaR.scale.x = this._osakaR.scale.y = this._tokyoR.scale.x,
        this._chinaR.scale.x = this._chinaR.scale.y = this._tokyoR.scale.x,
        this._cityMat2.opacity = .95 * this._cityMat2.opacity + 0,
        Math.abs(+this._cityMat2.opacity) < .01 && (this.isRing = !1,
        this._tokyoR.scale.x = .5,
        this._tokyoR.scale.y = .5,
        this._nagoyaR.scale.x = .5,
        this._nagoyaR.scale.y = .5,
        this._osakaR.scale.x = .5,
        this._osakaR.scale.y = .5,
        this._chinaR.scale.x = .5,
        this._chinaR.scale.y = .5,
        this._cityMat2.opacity = 1,
        this.isRing = !0))
    }
    ,
    t.prototype.contentsStart = function() {}
    ,
    t.prototype.onResize = function() {
        "PC" === _main._device ? this._scale = $(window).width() / 1600 : this._scale = $(window).width() / 1600 * 1.8
    }
    ,
    t
}()
  , MemberCaset = function() {
    "use strict";
    function t(t) {
        this._wait = 0,
        this.isSet = !1,
        this.isCancel = !1,
        this._stage = null,
        this._parm = t,
        this._parent = this._parm.parent,
        this._data = this._parm.data,
        this._num = this._parm.num,
        this.init()
    }
    return t.prototype.init = function() {
        var t;
        this._stage = this._parm.stage,
        this._wrapper = document.createElement("div"),
        this._wrapper.style.display = "inline-block",
        this._wrapper.style.position = "relative",
        this._wrapper.style.width = this._parent._width + "px",
        this._wrapper.style.height = this._parent._height + "px",
        null !== this._data && (this._wrapper.style.cursor = "pointer",
        this._effect = document.createElement("div"),
        this._effect.style.position = "absolute",
        this._effect.style.width = "100%",
        this._effect.style.height = "100%",
        this._effect.style.overflow = "hidden",
        this._effect.style.backgroundColor = "#121212",
        this._wrapper.appendChild(this._effect),
        this._imgSet = document.createElement("div"),
        this._imgSet.style.position = "absolute",
        this._imgSet.style.width = "100%",
        this._imgSet.style.height = "100%",
        $(this._imgSet).css({
            y: "60%",
            opacity: 0
        }),
        this._effect.appendChild(this._imgSet),
        this._name = document.createElement("div"),
        this._name.style.position = "absolute",
        this._name.style.lineHeight = "1.3em",
        this._name.style.left = "48%",
        this._name.style.top = "50%",
        this._name.style.marginTop = "-1.1em",
        this._name.style.letterSpacing = "0.07em",
        "PC" === _main._device ? this._name.innerHTML = "<span style='font-size:12px'>" + this._data.job + "</span><br>" + this._data.name_en : "SP" !== _main._device ? (this._name.style.fontSize = "14px",
        this._name.style.letterSpacing = "0.05em",
        this._name.innerHTML = "<span style='font-size:12px'>" + this._data.job + "</span><br>" + this._data.name_en) : this._name.innerHTML = this._data.name_en,
        $(this._name).css({
            opacity: 0
        }),
        this._effect.appendChild(this._name),
        this._over = document.createElement("div"),
        this._over.style.width = "100%",
        this._over.style.height = "100%",
        this._over.style.position = "absolute",
        this._over.style.backgroundColor = "#000000",
        this._over.style.opacity = 0,
        this._over.style.display = "none",
        "Edge" !== _main._ua.BROWSER && "IE" !== _main._ua.BROWSER && $(this._over).css({
            scale: 1.5
        }),
        this._effect.appendChild(this._over),
        this._overM = document.createElement("div"),
        this._overM.style.position = "absolute",
        this._overM.style.width = "42px",
        this._overM.style.height = "76px",
        this._overM.style.left = "50%",
        this._overM.style.top = "50%",
        this._overM.style.marginLeft = "-21px",
        this._overM.style.marginTop = "-38px",
        this._overM.innerHTML = "<img src='assets/image/img_over_mark.png' width='100%' height='100%' alt=''/>",
        this._over.appendChild(this._overM),
        this._evt = document.createElement("div"),
        this._evt.style.width = "100%",
        this._evt.style.height = "100%",
        this._evt.style.position = "absolute",
        this._evt.style.backgroundColor = "#000000",
        this._evt.style.opacity = 0,
        this._effect.appendChild(this._evt),
        t = this,
        "PC" === _main._device && (this._evt.addEventListener("mouseover", function() {
            t.mOver()
        }),
        this._evt.addEventListener("mouseout", function() {
            t.mOut()
        })),
        this._evt.addEventListener("click", function() {
            t.mClick()
        }),
        "SP" === _main._device && (this._name.style.fontSize = "1em",
        $(this._name).css({
            scale: .7
        }),
        this._name.style.marginTop = "-1.0em")),
        this._stage.appendChild(this._wrapper),
        "detail" === this._parm.type && this.loadImg()
    }
    ,
    t.prototype.loadImg = function() {
        var t, i;
        null !== this._data && (t = new Image,
        i = this,
        t.onload = function(t) {
            i.loadComp(t)
        }
        ,
        t.src = this._data.index_img)
    }
    ,
    t.prototype.loadComp = function(t) {
        t = t.target;
        t.style.width = "100%",
        t.style.height = "100%",
        this._imgSet.appendChild(t),
        _main.addEnterFrame(this, "waitFrame")
    }
    ,
    t.prototype.waitFrame = function() {
        var t;
        this._wait++,
        15 <= this._wait && (_main.removeEnterFrame(this),
        "list" !== this._parm.type || this.isCancel || this._parent.loadImgComp(),
        t = this,
        $(this._imgSet).transition({
            y: "0%",
            opacity: 1
        }, 400, "easeOutCubic", function() {
            t.isSet = !0
        }),
        $(this._name).transition({
            opacity: 1
        }, 400, "easeOutCubic"))
    }
    ,
    t.prototype.mOver = function() {
        this.isSet && (this._over.style.display = "block",
        "Edge" === _main._ua.BROWSER || "IE" === _main._ua.BROWSER ? $(this._over).stop().css({
            left: "-50%"
        }).animate({
            left: 0,
            opacity: .6
        }, 350, "easeOutCubic") : ($(this._over).stop().animate({
            opacity: .5,
            scale: 1
        }, 350, "easeOutCubic"),
        $(this._imgSet).stop().animate({
            scale: 1.15
        }, 3500, "easeOutCubic")))
    }
    ,
    t.prototype.mOut = function() {
        var t;
        this.isSet && (t = this,
        "Edge" === _main._ua.BROWSER || "IE" === _main._ua.BROWSER ? $(this._over).stop().animate({
            left: "-50%",
            opacity: 0
        }, 400, "easeOutCubic", function() {
            t._over.style.display = "none"
        }) : ($(this._over).stop().animate({
            opacity: 0,
            scale: 1.5
        }, 400, "easeOutCubic", function() {
            t._over.style.display = "none"
        }),
        $(this._imgSet).stop().animate({
            scale: 1
        }, 400, "easeOutCubic")))
    }
    ,
    t.prototype.mClick = function() {
        var t;
        this.isSet && ("list" === this._parm.type ? ((t = {}).id = this._data.id,
        t.target = this._effect,
        this._parent.addDetail(t)) : "detail" === this._parm.type && this._parent.gotoMember(this._data.id))
    }
    ,
    t.prototype.clear = function() {
        this.isCancel = !0,
        _main.removeEnterFrame(this),
        this._stage.removeChild(this._wrapper),
        this._wrapper = null
    }
    ,
    t.prototype.onResize = function() {
        this._wrapper.style.width = this._parent._width + "px",
        this._wrapper.style.height = this._parent._height + "px",
        null !== this._data && (this._effect.style.width = "100%",
        this._effect.style.height = "100%",
        this._imgSet.style.width = "100%",
        this._imgSet.style.height = "100%")
    }
    ,
    t
}()
  , MemberDetail = function() {
    "use strict";
    function t(t) {
        this._parent = t,
        this._parm = null,
        this._top = 0,
        this._width = 0,
        this._height = 0,
        this._bgW = 0,
        this._bgH = 0,
        this._bgT = 0,
        this.isOpen = !1,
        this._stageW = 0,
        this._relatedList = [],
        this.init()
    }
    return t.prototype.init = function() {
        this._relatedList = [],
        this._stage = document.getElementById("member-detail"),
        this._bg = document.getElementById("member-detail-bg"),
        this._img = document.getElementById("member-detail-img"),
        this._imgIn = document.getElementById("member-detail-img-in"),
        this._txt = document.getElementById("member-detail-txt"),
        this._related = document.getElementById("member-detail-related"),
        this._relatedIn = document.getElementById("member-detail-related-in"),
        this._memberName = document.getElementById("member-detail-name"),
        this._close = document.getElementById("member-detail-close"),
        "PC" !== _main._device && (this._close.innerHTML = "<img src='assets/image/modal_close_sp.png' width='100%' height='100%' alt='' />",
        this._close.style.width = "37px",
        this._close.style.height = "46px"),
        this._ex = document.getElementById("member-detail-profile");
        var t = this;
        this._close.addEventListener("click", function() {
            t.closeDetail()
        }, !1),
        this._bg.addEventListener("click", function() {
            t.isOpen && t.closeDetail()
        }, !1),
        this._relatedPage = document.getElementById("member-detail-page"),
        this._relatedPrev = document.createElement("div"),
        this._relatedPrev.id = "member-detail-prev",
        this._relatedPrev.style.position = "absolute",
        this._relatedPrev.style.width = "40px",
        this._relatedPrev.style.height = "40px",
        this._relatedPrev.style.backgroundColor = "#000000",
        this._relatedPrev.style.backgroundImage = "url(assets/image/member_prev.png)",
        this._relatedPrev.style.backgroundSize = "contain",
        this._relatedPrev.style.display = "none",
        this._relatedPage.appendChild(this._relatedPrev),
        this._relatedNext = document.createElement("div"),
        this._relatedNext.id = "member-detail-next",
        this._relatedNext.style.position = "absolute",
        this._relatedNext.style.width = "40px",
        this._relatedNext.style.height = "40px",
        this._relatedNext.style.backgroundColor = "#000000",
        this._relatedNext.style.backgroundImage = "url(assets/image/member_next.png)",
        this._relatedNext.style.backgroundSize = "contain",
        this._relatedPage.appendChild(this._relatedNext),
        "PC" !== _main._device && (this._relatedPrev.style.width = "30px",
        this._relatedPrev.style.height = "30px",
        this._relatedNext.style.width = "30px",
        this._relatedNext.style.height = "30px",
        this._relatedPrev.style.display = "block",
        this._relatedPrev.style.opacity = .3),
        this._relatedPrev.addEventListener("click", function() {
            t.pageChange(-1)
        }, !1),
        this._relatedNext.addEventListener("click", function() {
            t.pageChange(1)
        }, !1),
        this._relatedNum = 0
    }
    ,
    t.prototype.pageChange = function(t) {
        var i;
        "PC" === _main._device ? this._relatedList.length <= 3 || (this._relatedNum += t,
        this._relatedNum <= 0 ? (this._relatedNum = 0,
        this._relatedPrev.style.display = "none",
        this._relatedNext.style.display = "block") : 0 < this._relatedNum && this._relatedNum < this._relatedList.length - 3 ? (this._relatedPrev.style.display = "block",
        this._relatedNext.style.display = "block") : (this._relatedNext.style.display = "none",
        this._relatedPrev.style.display = "block",
        this._relatedNum = this._relatedList.length - 3),
        i = -this._width * this._relatedNum,
        $(this._relatedIn).transition({
            x: i
        }, 400, "easeOutCubic")) : this._relatedList.length <= 2 || (this._relatedNum += t,
        this._relatedNum <= 0 ? (this._relatedNum = 0,
        this._relatedPrev.style.opacity = .3,
        this._relatedNext.style.opacity = 1) : 0 < this._relatedNum && this._relatedNum < this._relatedList.length - 2 ? (this._relatedPrev.style.opacity = 1,
        this._relatedNext.style.opacity = 1) : (this._relatedNext.style.opacity = .3,
        this._relatedPrev.style.opacity = 1,
        this._relatedNum = this._relatedList.length - 2),
        i = -this._width * this._relatedNum,
        $(this._relatedIn).transition({
            x: i
        }, 400, "easeOutCubic"))
    }
    ,
    t.prototype.addDetail = function(t) {
        this._parm = t,
        this.onResize(),
        this._stage.style.display = "block",
        this._stage.style.opacity = 0,
        this._stage.style.width = "1px",
        this._bg.style.display = "block",
        $(this._bg).transition({
            opacity: .75
        }, 300, "easeOutCubic"),
        _main._sceneMng.detailSlide(this._top),
        _main._api.getMemberDetail(this._parm.id)
    }
    ,
    t.prototype.setMemberData = function(t) {
        $(this._relatedIn).css({
            x: 0
        }),
        this._relatedNum = 0,
        "PC" === _main._device ? this._relatedPrev.style.display = "none" : (this._relatedPrev.style.display = "display",
        this._relatedPrev.style.opacity = .3),
        this._relatedNext.style.display = "block",
        this._data = t;
        var i = 0;
        for (this._loadList = [],
        i = 0; i < this._data.detail_img.length; i++)
            this._loadList.push(this._data.detail_img[i]);
        for (i = 0; i < this._data.works.length; i++)
            this._loadList.push(this._data.works[i].index_img);
        _main._ring.setLoading("member", this._stage),
        this._loadCount = 0,
        this.loadImgStart()
    }
    ,
    t.prototype.loadImgStart = function() {
        var t = new Image
          , i = this;
        t.onload = function() {
            i.loadCheck()
        }
        ,
        t.src = this._loadList[this._loadCount]
    }
    ,
    t.prototype.loadCheck = function() {
        if (this._loadCount++,
        this._loadCount >= this._loadList.length) {
            for (var t = "", i = 0; i < this._data.detail_img.length; i++)
                t += "<img src='" + this._data.detail_img[i] + "' width='100%' height='100%' alt='' />";
            this._imgIn.innerHTML = t;
            var e = "";
            for (e += this._data.job_jp + "。<br>",
            e += this._data.text,
            this._ex.innerHTML = e,
            i = 0; i < this._data.works.length; i++) {
                var s = {};
                s.parent = this,
                s.type = "detail",
                s.stage = this._relatedIn,
                s.data = this._data.works[i],
                s.num = i;
                s = new WorksCaset(s);
                this._relatedList.push(s)
            }
            "PC" === _main._device ? 3 < this._relatedList.length && (this._relatedPage.style.display = "block") : 2 < this._relatedList.length && (this._relatedPage.style.display = "block");
            e = "";
            e += this._data.job + "<br>",
            e += "<span class='member-detail-name-l'>" + this._data.name_jp + "</span><br>",
            e += this._data.name_en,
            this._memberName.innerHTML = e,
            "PC" !== _main._device && (this._memberName.style.opacity = 0),
            this.onResize(),
            this._stage.style.opacity = 1;
            var h = this;
            $(this._stage).transition({
                width: this._stageW + "px"
            }, 400, "easeOutCubic", function() {
                h.isOpen = !0,
                "PC" !== _main._device && $(h._memberName).animate({
                    opacity: 1
                }, 200)
            }),
            $(this._img).css({
                x: "-50%"
            }).transition({
                x: 0
            }, 400, "easeOutCubic"),
            _main._ring.removeLoading()
        } else
            this.loadImgStart()
    }
    ,
    t.prototype.closeDetail = function() {
        "PC" !== _main._device && (this._memberName.innerHTML = ""),
        this._relatedPage.style.display = "none";
        var t = this;
        $(this._stage).transition({
            width: "1px"
        }, 250, "easeOutCubic", function() {
            t.closeComp()
        })
    }
    ,
    t.prototype.closeComp = function() {
        this.isOpen = !1,
        this._stage.style.opacity = 0,
        this._stage.style.display = "none";
        var i = this;
        $(this._bg).transition({
            opacity: 0
        }, 300, "easeOutCubic", function() {
            i._bg.style.opacity = 0,
            i._bg.style.display = "none";
            for (var t = 0; t < i._relatedList.length; t++)
                i._relatedList[t].clear();
            i._relatedList = []
        })
    }
    ,
    t.prototype.allClear = function() {
        if (this.isOpen) {
            this.isOpen = !1,
            this._stage.style.opacity = 0,
            this._stage.style.display = "none",
            this._relatedPage.style.display = "none",
            this._bg.style.opacity = 0,
            this._bg.style.display = "none";
            for (var t = 0; t < this._relatedList.length; t++)
                this._relatedList[t].clear();
            this._relatedList = []
        }
    }
    ,
    t.prototype.gotoWorks = function(t) {
        this.closeDetail(),
        _main._works.addDetailFromMember(t)
    }
    ,
    t.prototype.onResize = function() {
        var t, i;
        if (this._width = this._parent._width,
        this._height = this._parent._height,
        this._parm && (this._top = $(this._parm.target).offset().top,
        "PC" !== _main._device && (t = $(this._parent._stage).offset().top + $(this._parent._stage).height(),
        this._top >= t - this._height - 10 && (this._top -= 2 * this._height)),
        this._stage.style.top = this._top + "px"),
        "PC" === _main._device) {
            this._stageW = 3 * this._width,
            this.isOpen && (this._stage.style.width = this._stageW + "px"),
            this._relatedList.length <= 0 ? this._stage.style.height = 2 * this._height + "px" : this._stage.style.height = 3 * this._height + "px",
            this._stage.style.left = "50%",
            this._stage.style.marginLeft = -3 * this._width * .5 + "px",
            this._bgW = $(this._parent._stage).width(),
            this._bgH = $(this._parent._stage).height(),
            this._bgT = $(this._parent._stage).offset().top,
            this._bg.style.width = this._bgW + "px",
            this._bg.style.height = this._bgH + 120 + "px",
            this._bg.style.top = this._bgT + "px",
            this._bg.style.left = "50%",
            this._bg.style.marginLeft = .5 * -this._bgW + "px",
            this._img.style.position = "absolute",
            this._img.style.width = 2 * this._width + "px",
            this._img.style.height = 2 * this._height + "px",
            this._img.style.overflow = "hidden",
            this._img.style.backgroundColor = "#121212",
            this._imgIn.style.position = "absolute",
            this._imgIn.style.width = "100%",
            this._imgIn.style.height = "100%",
            this._txt.style.position = "absolute",
            this._txt.style.left = 2 * this._width + "px",
            this._txt.style.width = this._width + "px",
            this._txt.style.height = 2 * this._height + "px",
            this._txt.style.backgroundColor = "#000000",
            this._related.style.position = "absolute",
            this._related.style.width = 3 * this._width + "px",
            this._related.style.top = 2 * this._height + "px",
            this._relatedList.length <= 0 ? this._related.style.display = "none" : (this._relatedIn.style.width = this._width * this._relatedList.length + "px;",
            this._relatedIn.style.height = this._height + "px",
            this._related.style.display = "block",
            i = -this._width * this._relatedNum,
            $(this._relatedIn).css({
                x: i
            }));
            for (var e = 0; e < this._relatedList.length; e++)
                this._relatedList[e].onResize();
            $(window).width() > _main._conf._borderW ? (this._memberName.style.top = "204px",
            this._memberName.style.left = "522px") : (this._memberName.style.top = "172px",
            this._memberName.style.left = "442px"),
            this._relatedPage.style.top = this._top + 2 * this._height + .5 * this._height + "px",
            this._relatedPage.style.left = "50%",
            this._relatedPage.style.marginLeft = .5 * -this._bgW + "px",
            this._relatedPrev.style.top = "-20px",
            this._relatedPrev.style.left = "-45px",
            this._relatedNext.style.top = "-20px",
            this._relatedNext.style.opacity = 1,
            this._relatedNext.style.left = 3 * this._width + 5 + "px"
        } else {
            this._stageW = 2 * this._width,
            this.isOpen && (this._stage.style.width = this._stageW + "px"),
            this._relatedList.length <= 0 ? this._stage.style.height = 3 * this._height + "px" : this._stage.style.height = 4 * this._height + "px",
            this._stage.style.left = "50%",
            this._stage.style.marginLeft = -2 * this._width * .5 + "px",
            this._bgW = $(this._parent._stage).width(),
            this._bgH = $(this._parent._stage).height(),
            this._bgT = $(this._parent._stage).offset().top,
            this._bg.style.width = this._bgW + "px",
            this._bg.style.height = this._bgH + 120 + "px",
            this._bg.style.top = this._bgT + "px",
            this._bg.style.left = "50%",
            this._bg.style.marginLeft = .5 * -this._bgW + "px",
            this._img.style.position = "absolute",
            this._img.style.width = 2 * this._width + "px",
            this._img.style.height = 2 * this._height + "px",
            this._img.style.overflow = "hidden",
            this._img.style.backgroundColor = "#121212",
            this._imgIn.style.position = "absolute",
            this._imgIn.style.width = "100%",
            this._imgIn.style.height = "100%",
            this._txt.style.position = "absolute",
            this._txt.style.left = 0,
            this._txt.style.width = 2 * this._width + "px",
            this._txt.style.height = +this._height + "px",
            this._txt.style.top = 2 * this._height + "px",
            this._txt.style.backgroundColor = "#000000",
            this._related.style.position = "absolute",
            this._related.style.width = this._width * this._relatedList.length + "px",
            this._related.style.top = 3 * this._height + "px",
            this._related.style.lineHeight = 0,
            this._relatedList.length <= 0 ? this._related.style.display = "none" : (this._relatedIn.style.width = this._width * this._relatedList.length + "px;",
            this._relatedIn.style.height = this._height + "px",
            this._related.style.display = "block",
            i = -this._width * this._relatedNum,
            $(this._relatedIn).css({
                x: i
            }));
            for (e = 0; e < this._relatedList.length; e++)
                this._relatedList[e].onResize();
            this._close.style.top = 2 * -this._height + "px",
            this._close.style.left = 2 * this._width - 37 + "px",
            this._memberName.style.top = this._height - 32 + "px",
            this._memberName.style.left = 2 * this._width * .52 + "px",
            this._relatedPage.style.top = this._top + 3 * this._height + .5 * this._height + "px",
            this._relatedPage.style.left = "50%",
            this._relatedPage.style.marginLeft = .5 * -this._bgW + "px",
            this._relatedPrev.style.top = "-15px",
            this._relatedPrev.style.left = "-15px",
            this._relatedNext.style.top = "-15px",
            this._relatedNext.style.opacity = 1,
            this._relatedNext.style.left = 2 * this._width - 15 + "px"
        }
    }
    ,
    t
}()
  , MemberPulldown = function() {
    function t(t) {
        this._parent = t,
        this._bc = new Beacon,
        this._currentFilter = "all",
        this._currentValue = "",
        this.init()
    }
    return t.prototype.init = function() {
        var t, i, e, s, h;
        this._count = 0;
        var a = this;
        for (this._sortIdList = [],
        this._sortElements = [],
        this._stage = document.getElementById("member"),
        this._sort_cate = document.getElementById("sort-category"),
        this._sort_all = document.getElementById("sort-all-m"),
        this._sort_all.style.opacity = .4,
        this._sort_all.style.cursor = "default",
        this._data = _main._api.getMemberMenu(),
        this._sort_cate.addEventListener("mouseover", function() {
            a.show("category")
        }, !1),
        this._sort_all.addEventListener("click", function() {
            1 <= a._sort_all.style.opacity && a.setFilter("all", "")
        }, !1),
        this._cate = document.createElement("div"),
        this._cate.style.position = "absolute",
        this._cate.style.width = "232px",
        this._cate.style.paddingTop = "16px",
        this._cate.style.paddingBottom = "16px",
        this._cate.style.backgroundColor = "#ffffff",
        this._cate.style.color = "#000000",
        this._cate.style.display = "none",
        i = "",
        t = 0; t < this._data.category.length; t++)
            i += "<p class='pulldown'>",
            i += "<span class='pulldown-sp' id=\"" + (e = String("s_" + this._data.category[t])) + '" onclick=\'_main._member._pulldown.setFilter("category","' + this._data.category[t] + "\");'>",
            i += this._data.category[t].toUpperCase() + "</span></p>",
            this._sortIdList.push(e);
        for (this._cate.innerHTML = i,
        s = $(this._sort_cate).offset().top,
        h = $(this._stage).offset().left,
        this._cate.style.top = s + 26 + "px",
        1700 <= window.parent.screen.width ? this._cate.style.left = h + 266 + "px" : this._cate.style.left = h + 216 + "px",
        document.body.appendChild(this._cate),
        t = 0; t < this._sortIdList.length; t++)
            this._sortElements.push(document.getElementById(this._sortIdList[t]))
    }
    ,
    t.prototype.show = function(t) {
        for (var i, e = 0; e < this._sortElements.length; e++)
            this._sortElements[e].id === String("s_" + this._currentValue) ? ($(this._sortElements[e]).removeClass("pulldown-sp"),
            $(this._sortElements[e]).removeClass("pulldown-sp-n"),
            $(this._sortElements[e]).addClass("pulldown-sp-n")) : ($(this._sortElements[e]).removeClass("pulldown-sp"),
            $(this._sortElements[e]).removeClass("pulldown-sp-n"),
            $(this._sortElements[e]).addClass("pulldown-sp"));
        "category" === t && (this._bc.clear(),
        this._count = 0,
        i = $(this._sort_cate).offset().top,
        t = $(this._stage).offset().left,
        this._cate.style.top = i + 26 + "px",
        1700 <= window.parent.screen.width ? this._cate.style.left = t + 266 + "px" : this._cate.style.left = t + 216 + "px",
        this._cate.style.display = "block",
        this._cate.style.opacity = 1,
        this._bc.set(this, "checkFrame"))
    }
    ,
    t.prototype.checkFrame = function() {
        var t, i, e, s;
        this._count++,
        this._count < 10 || (this._count = 10,
        t = $(this._cate).offset().top,
        i = $(this._cate).offset().left,
        e = $(this._cate).height() + t,
        s = $(this._cate).width() + i,
        (_main._world._originX < i || _main._world._originX > s || _main._world._originY < t - 24 || _main._world._originY > e) && (this._bc.clear(),
        this._cate.style.display = "none"))
    }
    ,
    t.prototype.setFilter = function(t, i) {
        this._currentValue !== i && (this._currentFilter = t,
        this._currentValue = i,
        "all" === this._currentFilter ? ($(this._sort_all).animate({
            opacity: .4
        }, 200),
        this._sort_all.style.cursor = "default") : ($(this._sort_all).animate({
            opacity: 1
        }, 200),
        this._sort_all.style.cursor = "pointer"),
        this._bc.clear(),
        this._cate.style.display = "none",
        this._count = 0,
        _main._member.setFilter(t, i))
    }
    ,
    t
}()
  , MemberSet = function() {
    "use strict";
    function t() {
        this.init()
    }
    return t.prototype.init = function() {
        this.isAll = !0,
        this.isStart = !1,
        this._imgList = [],
        this._loadNum = 0,
        this.isLoadEnd = !1,
        this.isEvent = !1,
        this._width = 1600,
        this._height = 900,
        this._member = document.getElementById("member"),
        this._stage = document.getElementById("member-list"),
        this._sort_category = document.getElementById("sort-category"),
        "PC" === _main._device ? this._pulldown = new MemberPulldown(this) : this._pulldown = new PulldownSP({
            type: "member",
            parent: this
        }),
        this._more = document.getElementById("member-more"),
        this._moreBorder = document.getElementById("member-more-border"),
        this.isMoreAnim = !1,
        this._detail = new MemberDetail(this);
        var t = {
            filter: "all",
            value: "",
            isFilter: !(this._casets = [])
        };
        this.createCaset(t)
    }
    ,
    t.prototype.createCaset = function(t) {
        if (this.isAll = !1,
        "all" === t.filter && (this.isAll = !0),
        this.isStart = !1,
        this._imgList = [],
        this._loadNum = 0,
        this.isLoadEnd = !1,
        this._casets = [],
        this._wList = [],
        "all" === t.filter ? this._wList = _main._api.getMemberList() : this._wList = _main._api.getFilterResult("member", t.filter, t.value),
        this._wList.length <= 0)
            console.log("MEMBER FILTER LENGTH 0");
        else {
            this._pageLimit = 21,
            this._pageNum = 0,
            this._pageMax = Math.ceil(this._wList.length / this._pageLimit),
            this._pageList = [];
            for (var i = 0; i < this._pageMax; i++) {
                for (var e = [], s = 0; s < this._pageLimit; s++)
                    void 0 !== this._wList[s + i * this._pageLimit] && e.push(this._wList[s + i * this._pageLimit]);
                this._pageList.push(e)
            }
            this._pageMax <= 1 ? (this._more.style.cursor = "default",
            $(this._more).transition({
                opacity: .3
            })) : (this._more.style.cursor = "pointer",
            $(this._more).transition({
                opacity: 1
            })),
            addResize(this),
            this.onResize(),
            this.createImg(t.isFilter)
        }
    }
    ,
    t.prototype.createImg = function(t) {
        var i, e = this._pageList[this._pageNum], s = [], h = (_main._device,
        3 <= e.length ? s = [1, 1, 1] : 1 === e.length ? s = [1, 0, 0] : 2 === e.length && (s = [1, 1, 0]),
        Math.floor((e.length - 3) / 2));
        if ("PC" === _main._device)
            for (o = 0; o < h; o++)
                0 === (i = o % 4) ? (s.push(1),
                s.push(1),
                s.push(0)) : 1 === i ? (s.push(0),
                s.push(1),
                s.push(1)) : 2 === i ? (s.push(1),
                s.push(1),
                s.push(0)) : (s.push(1),
                s.push(0),
                s.push(1));
        else
            for (o = 0; o < h; o++)
                i = o % 4,
                s.push(1),
                s.push(1),
                s.push(0);
        for (var a = 0, o = 0; o < s.length; o++)
            1 === s[o] && a++;
        var n = e.length - a;
        for (o = 0; o < n; o++)
            s.push(1);
        var _ = []
          , r = 0;
        for (o = 0; o < s.length; o++)
            _.push(s[o]),
            1 == s[o] && (1 == e[r].border && ("PC" === _main._device ? (o % 3 == 0 || o % 3 == 1 && 0 !== s[o + 1]) && (_.push(0),
            _.push(0),
            _.push(0)) : o % 2 == 0 && 0 !== s[o + 1] && _.push(0)),
            r++);
        for (o = r = 0; o < _.length; o++) {
            var l, p = {};
            1 === _[o] ? (p.parent = this,
            p.type = "list",
            p.stage = document.getElementById("member-list"),
            p.data = e[r],
            p.num = o,
            l = new MemberCaset(p),
            this._imgList.push(l),
            r++) : (p.parent = this,
            p.type = "list",
            p.stage = document.getElementById("member-list"),
            p.data = null,
            p.num = o,
            l = new MemberCaset(p)),
            this._casets.push(l)
        }
        t && (onResize(),
        this.isStart = !1,
        this.start())
    }
    ,
    t.prototype.start = function() {
        var t;
        this.isStart || (this.isStart = !0,
        this.isEvent || (this.isEvent = !0,
        (t = this)._more.addEventListener("click", function() {
            t.moreClick()
        }, !1),
        this._more.addEventListener("mouseover", function() {
            t.moreOver()
        }, !1)),
        this.loadImg())
    }
    ,
    t.prototype.loadImg = function() {
        _main._sceneMng.onResize(),
        this._imgList[this._loadNum].loadImg()
    }
    ,
    t.prototype.loadImgComp = function() {
        this._loadNum++,
        this._loadNum >= this._imgList.length ? this.isLoadEnd = !0 : this.loadImg()
    }
    ,
    t.prototype.addDetail = function(t) {
        this._detail.addDetail(t)
    }
    ,
    t.prototype.addDetailFromWorks = function(t) {
        this._detail.allClear();
        for (var i = {}, e = !1, s = 0; s < this._imgList.length; s++)
            if (this._imgList[s]._data.id === t) {
                e = !0,
                i.id = t,
                i.target = this._imgList[s]._effect,
                this.addDetail(i);
                break
            }
        e || (i.id = t,
        i.target = this._imgList[0]._effect,
        this.addDetail(i))
    }
    ,
    t.prototype.setFilter = function(t, i) {
        if (this._detail.allClear(),
        0 < this._casets.length)
            for (var e = 0; e < this._casets.length; e++)
                this._casets[e].clear();
        this._casets = [];
        var s = {};
        s.filter = t,
        s.value = i,
        s.isFilter = !0,
        this.createCaset(s),
        _main._sceneMng.pageSlide("member")
    }
    ,
    t.prototype.moreClick = function() {
        this._pageNum++,
        this._pageNum >= this._pageMax || (_main._works._detail.closeDetail(),
        this._detail.isOpen && this._detail.closeDetail(),
        this.createImg(),
        this.isLoadEnd && (this.isLoadEnd = !1,
        this.loadImg()),
        this._pageNum >= this._pageMax - 1 && (this._more.style.cursor = "default",
        $(this._more).transition({
            opacity: .3
        })))
    }
    ,
    t.prototype.moreOver = function() {
        var t;
        this._pageNum >= this._pageMax || this.isMoreAnim || (this.isMoreAnim = !0,
        t = this,
        $(this._moreBorder).transition({
            x: "100%"
        }, 250, "linear", function() {
            $(t._moreBorder).css({
                x: "-100%"
            }),
            t.moreOver2()
        }))
    }
    ,
    t.prototype.moreOver2 = function() {
        var t = this;
        $(this._moreBorder).delay(50).transition({
            x: 0
        }, 250, "easeOutCubic", function() {
            t.isMoreAnim = !1
        })
    }
    ,
    t.prototype.onResize = function() {
        var t = $(window).width();
        "PC" !== _main._device ? (this._width = Math.floor(.5 * (t - 40)),
        this._height = Math.ceil(this._width / 16 * 9),
        this._member.style.width = t - 40 + "px") : t > _main._conf._borderW ? (this._width = 436,
        this._height = 245,
        this._member.style.width = "1308px") : (this._width = 368,
        this._height = 207,
        this._member.style.width = "1104px");
        for (var i = 0; i < this._casets.length; i++)
            this._casets[i].onResize();
        this._detail && this._detail.onResize()
    }
    ,
    t
}()
  , NoiseSet = function() {
    function t() {
        this.init()
    }
    return t.prototype.init = function() {
        this._speed = 0,
        this._width = this._height = 256,
        this.setViewPort(),
        this._cam = new THREE.OrthographicCamera(this._viewPort.left,this._viewPort.right,this._viewPort.top,this._viewPort.bottom,this._viewPort.near,this._viewPort.far),
        this._cam.position.set(0, 0, 10),
        this._scene = new THREE.Scene,
        this._render = new THREE.WebGLRenderTarget(this._width,this._height,{
            magFilter: THREE.NearestFilter,
            minFilter: THREE.NearestFilter,
            wrapS: THREE.ClampToEdgeWrapping,
            wrapT: THREE.ClampToEdgeWrapping,
            type: THREE.FloatType
        }),
        this._count = 0,
        this._cloud1Tex = _main._parts.getTex("assets/image/cloud.png"),
        this._cloud1Tex.wrapS = THREE.RepeatWrapping,
        this._cloud1Tex.wrapT = THREE.RepeatWrapping,
        this._cloud2Tex = _main._parts.getTex("assets/image/cloud2.png"),
        this._cloud2Tex.wrapS = THREE.RepeatWrapping,
        this._cloud2Tex.wrapT = THREE.RepeatWrapping,
        this._geo = new THREE.PlaneBufferGeometry(256,256,2,2),
        this._shader = {
            vertexShader: _main._parts.getShader("assets/shader/noise_vtx.js"),
            fragmentShader: _main._parts.getShader("assets/shader/noise_frg.js"),
            uniforms: {
                cloud1: {
                    type: "t",
                    value: this._cloud1Tex
                },
                cloud2: {
                    type: "t",
                    value: this._cloud2Tex
                },
                count: {
                    type: "f",
                    value: this._count
                }
            }
        },
        this._mat = new THREE.ShaderMaterial(this._shader),
        this._mesh = new THREE.Mesh(this._geo,this._mat),
        this._scene.add(this._mesh),
        _main.addEnterFrame(this, "enterFrame")
    }
    ,
    t.prototype.enterFrame = function() {
        this._count += .002,
        this._shader.uniforms.count.value = this._count,
        _main._world._render.render(this._scene, this._cam, this._render)
    }
    ,
    t.prototype.setViewPort = function() {
        this._viewPort = {};
        var t = this._width
          , i = this._height
          , t = t / i;
        this._viewPort = {
            viewSize: i,
            aspectRatio: t,
            left: -t * i / 2,
            right: t * i / 2,
            top: i / 2,
            bottom: -i / 2,
            near: 0,
            far: 1e4
        }
    }
    ,
    t
}()
  , PartsLoader = function() {
    "use strict";
    function t() {
        this._itemCount = 0,
        this._listCount = 0,
        this._imgNum = 0,
        this._imgLoadedNum = 0,
        this._pipeline = 4,
        this._imgMap = {},
        this._texMap = {},
        this._modelMap = {},
        this._shaderMap = {},
        this._jsonMap = {},
        this._htmlMap = {},
        this.init()
    }
    return t.prototype.init = function() {
        if (this._firstItem = [],
        _main._webGL) {
            for (var t = [_main._conf._jsonFileAbout, _main._conf._jsonFileRecruit], i = _main._jsonMng.getJson(_main._conf._jsonFile).top_image.entries.small, e = ["assets/image/empty.png", "assets/image/top_logo.png", "assets/image/top_logo_sp.png", "assets/image/bd_dot.png", "assets/image/particle.png", "assets/image/city.png", "assets/image/city_ring.png", "assets/image/map_tokyo.png", "assets/image/map_nagoya.png", "assets/image/map_osaka.png", "assets/image/map_china.png", "assets/image/cloud.png", "assets/image/cloud2.png", "assets/image/logos/logo0.png", "assets/image/logos/logo1.png", "assets/image/logos/logo2.png", "assets/image/logos/logo3.png", "assets/image/logos/logo4.png", "assets/image/logos/logo5.png", "assets/image/logos/logo6.png", "assets/image/logos/logo7.png", "assets/image/logos/logo8.png"], s = 0; s < i.length; s++)
                e.push(i[s]);
            this._firstItem = [{
                _type: "image",
                _list: ["assets/image/map.png"]
            }, {
                _type: "model",
                _list: ["assets/json/model.json"]
            }, {
                _type: "texture",
                _list: e
            }, {
                _type: "shader",
                _list: ["assets/shader/topTitle_vtx.js", "assets/shader/topTitle_frg.js", "assets/shader/bg_caset_vtx.js", "assets/shader/bg_caset_frg.js", "assets/shader/bg_caset_l_vtx.js", "assets/shader/bg_caset_l_frg.js", "assets/shader/bg_line_vtx.js", "assets/shader/bg_line_frg.js", "assets/shader/display_vtx.js", "assets/shader/display_frg.js", "assets/shader/map_vtx.js", "assets/shader/map_sp_vtx.js", "assets/shader/map_frg.js", "assets/shader/mLogo_vtx.js", "assets/shader/mLogo_frg.js", "assets/shader/map_line_vtx.js", "assets/shader/map_line_frg.js", "assets/shader/noise_vtx.js", "assets/shader/noise_frg.js"]
            }, {
                _type: "html",
                _list: t
            }]
        }
    }
    ,
    t.prototype.firstLoad = function() {
        for (var t = 0; t < this._pipeline; t++)
            this.pipelineLoad()
    }
    ,
    t.prototype.pipelineLoad = function() {
        var t, e, i, s, h, a, o = this;
        this._itemCount >= this._firstItem.length || (e = this._firstItem[this._itemCount],
        i = e._list[this._listCount],
        s = this._listCount,
        "json" === e._type ? (a = i,
        $.getJSON(a, function(t) {
            o.loadJsonEnd(t, e, s)
        })) : "texture" === e._type ? (t = new THREE.TextureLoader).load(i, function(t) {
            o.loadTextureEnd(t, e, s, i)
        }) : "image" === e._type ? ((h = new Image).onload = function() {
            o.loadImageEnd(this, e, s)
        }
        ,
        h.src = i) : "model" === e._type ? (t = new THREE.JSONLoader).load(i, function(t, i) {
            o.loadModelEnd(t, i, e, s)
        }) : "shader" === e._type ? ((t = new XMLHttpRequest).open("GET", i, !0),
        t.onreadystatechange = function() {
            4 == t.readyState && (200 == t.status ? o.loadShsderEnd(t.responseText, e, s) : console.log("shader load failed"))
        }
        ,
        t.send(null)) : "html" === e._type && (a = i + "?v=" + Math.floor(1e4 * Math.random()),
        $.ajax(a, {
            timeout: 2e4,
            datatype: "html"
        }).then(function(t) {
            o.loadHtmlEnd(t, e, s)
        })),
        this._imgNum++,
        this._listCount++,
        this._listCount >= e._list.length && (this._listCount = 0,
        this._itemCount++))
    }
    ,
    t.prototype.loadJsonEnd = function(t, i, e) {
        e = i._list[e];
        this._jsonMap[e] = t,
        this.fLoadCompCheck()
    }
    ,
    t.prototype.loadTextureEnd = function(t, i, e) {
        t.needsUpdate = !0,
        t.minFilter = THREE.LinearFilter,
        t.magFilter = THREE.LinearFilter;
        e = i._list[e];
        this._texMap[e] = t,
        this.fLoadCompCheck()
    }
    ,
    t.prototype.loadImageEnd = function(t, i, e) {
        e = i._list[e];
        this._imgMap[e] = t,
        this.fLoadCompCheck()
    }
    ,
    t.prototype.loadModelEnd = function(t, i, e, s) {
        i && 0 < i.length && (i[0].dispose(),
        null != i[0].map && null != i[0].map && i[0].map.dispose(),
        i = []);
        s = e._list[s];
        this._modelMap[s] = t,
        this.fLoadCompCheck()
    }
    ,
    t.prototype.loadShsderEnd = function(t, i, e) {
        e = i._list[e];
        this._shaderMap[e] = t,
        this.fLoadCompCheck()
    }
    ,
    t.prototype.loadHtmlEnd = function(t, i, e) {
        e = i._list[e];
        this._htmlMap[e] = t,
        this.fLoadCompCheck()
    }
    ,
    t.prototype.fLoadCompCheck = function() {
        this.pipelineLoad(),
        this._imgLoadedNum++,
        this._imgLoadedNum >= this._imgNum && _main.partsLoadComp()
    }
    ,
    t.prototype.getJson = function(t) {
        var i, e = null;
        for (i in this._jsonMap)
            i.match(t) && (e = this._jsonMap[i]);
        return e
    }
    ,
    t.prototype.getTex = function(t) {
        var i, e = null;
        for (i in this._texMap)
            i.match(t) && (e = this._texMap[i]);
        return e
    }
    ,
    t.prototype.getModel = function(t) {
        var i, e = null;
        for (i in this._modelMap)
            i.match(t) && (e = this._modelMap[i]);
        return e
    }
    ,
    t.prototype.getImage = function(t) {
        var i, e = null;
        for (i in this._imgMap)
            i.match(t) && (e = this._imgMap[i]);
        return e
    }
    ,
    t.prototype.getShader = function(t) {
        var i, e = null;
        for (i in this._shaderMap)
            i.match(t) && (e = this._shaderMap[i]);
        return e
    }
    ,
    t.prototype.getHtml = function(t) {
        var i, e = null;
        for (i in this._htmlMap)
            i.match(t) && (e = this._htmlMap[i]);
        return e
    }
    ,
    t
}()
  , PulldownSP = function() {
    function t(t) {
        this._type = t.type,
        this._parent = t.parent,
        this.init()
    }
    return t.prototype.init = function() {
        var t, i;
        this._currentWFilter = "all",
        this._currentWValue = "",
        this._currentMFilter = "all",
        this._currentMValue = "";
        var e, s = this;
        if (this._sortIdListW = [],
        this._sortElementsW = [],
        this._sortIdListM = [],
        this._sortElementsM = [],
        this._filter = document.getElementById("sp-filter"),
        this._close = document.getElementById("filter-close"),
        this._close.style.display = "none",
        this._close.style.opacity = 0,
        this._wFil = document.getElementById("fil-works"),
        this._wFilLeft = document.getElementById("fil-w-left"),
        this._wFilRight = document.getElementById("fil-w-right"),
        this._wFilAll = document.getElementById("fil-w-all"),
        this._wFilAll.style.color = "#666666",
        this._mFil = document.getElementById("fil-member"),
        this._base = document.createElement("div"),
        this._base.style.position = "absolute",
        this._base.style.width = "122px",
        this._base.style.height = "22px",
        this._base.style.borderBottom = "solid 2px #FFFFFF",
        this._base.style.bottom = "10px",
        this._base.style.fontWeight = 400,
        this._base.innerHTML = "FILTER",
        "works" === this._type) {
            this._base.style.left = "120px",
            e = document.getElementById("works-under-title");
            var h = _main._api.getWorksMenu()
              , a = "";
            for (a += "<p class='fil-title'>YEAR</p>",
            i = 0; i < h.year.length; i++)
                a += "<p class='fil-link'>",
                a += "<span class='fil-link-sp' id=\"" + (t = String("s_" + h.year[i])) + '"  onclick=\'_main._works._pulldown.setFilter("year","' + h.year[i] + "\");'>",
                a += h.year[i] + "</span></p>",
                this._sortIdListW.push(t);
            this._wFilLeft.innerHTML = a;
            var o = "";
            for (o += "<p class='fil-title'>GENRE</p>",
            i = 0; i < h.genre.length; i++)
                o += "<p class='fil-link'>",
                o += "<span class='fil-link-sp' id=\"" + (t = String("s_" + h.genre[i])) + '"  onclick=\'_main._works._pulldown.setFilter("genre","' + h.genre[i] + "\");'>",
                o += h.genre[i].toUpperCase() + "</span></p>",
                this._sortIdListW.push(t);
            for (this._wFilRight.innerHTML = o,
            this._wFilAll.addEventListener("click", function() {
                s.setFilter("all", "")
            }, !1),
            i = 0; i < this._sortIdListW.length; i++)
                this._sortElementsW.push(document.getElementById(this._sortIdListW[i]))
        } else if ("member" === this._type) {
            this._base.style.left = "140px",
            e = document.getElementById("member-under-title");
            var n = _main._api.getMemberMenu()
              , _ = "";
            for (_ += "<p class='fil-title'>CATEGORIES</p>",
            i = 0; i < n.category.length; i++)
                _ += "<p class='fil-link'>",
                _ += "<span class='fil-link-sp' id=\"" + (t = String("s_" + n.category[i])) + '"  onclick=\'_main._member._pulldown.setFilter("category","' + n.category[i] + "\");'>",
                _ += n.category[i] + "</span></p>",
                this._sortIdListM.push(t);
            for (_ += "<div id='fil-m-all'>",
            _ += "<span id='fil-m-all-s' class='fil-link-sp fil-all-mt' onclick='_main._member._pulldown.setFilter(\"all\",\"\");'>",
            _ += "ALL</span></div>",
            this._mFil.innerHTML = _,
            this._mFilAll = document.getElementById("fil-m-all-s"),
            this._mFilAll.style.color = "#666666",
            i = 0; i < this._sortIdListM.length; i++)
                this._sortElementsM.push(document.getElementById(this._sortIdListM[i]))
        }
        e.appendChild(this._base),
        this._base.addEventListener("click", function() {
            s.addFilter()
        }, !1),
        this._close.addEventListener("click", function() {
            s.closeFilter()
        }, !1)
    }
    ,
    t.prototype.addFilter = function() {
        var t, i = this;
        if ("works" === this._type) {
            for (this._wFil.style.display = "block",
            this._mFil.style.display = "none",
            t = 0; t < this._sortElementsW.length; t++)
                this._sortElementsW[t].id === String("s_" + this._currentWValue) ? ($(this._sortElementsW[t]).removeClass("fil-link-sp"),
                $(this._sortElementsW[t]).removeClass("fil-link-sp-n"),
                $(this._sortElementsW[t]).addClass("fil-link-sp-n")) : ($(this._sortElementsW[t]).removeClass("fil-link-sp"),
                $(this._sortElementsW[t]).removeClass("fil-link-sp-n"),
                $(this._sortElementsW[t]).addClass("fil-link-sp"));
            "" === this._currentWValue ? this._wFilAll.style.color = "#666666" : this._wFilAll.style.color = "#ffffff"
        } else if ("member" === this._type) {
            for (this._wFil.style.display = "none",
            this._mFil.style.display = "block",
            t = 0; t < this._sortElementsM.length; t++)
                this._sortElementsM[t].id === String("s_" + this._currentMValue) ? ($(this._sortElementsM[t]).removeClass("fil-link-sp"),
                $(this._sortElementsM[t]).removeClass("fil-link-sp-n"),
                $(this._sortElementsM[t]).addClass("fil-link-sp-n")) : ($(this._sortElementsM[t]).removeClass("fil-link-sp"),
                $(this._sortElementsM[t]).removeClass("fil-link-sp-n"),
                $(this._sortElementsM[t]).addClass("fil-link-sp"));
            "" === this._currentMValue ? this._mFilAll.style.color = "#666666" : this._mFilAll.style.color = "#ffffff"
        }
        this._filter.style.left = "100%",
        this._filter.style.display = "block",
        $(this._filter).transition({
            left: 0
        }, 400, "easeOutCubic", function() {
            i._close.style.display = "block",
            $(i._close).animate({
                opacity: 1
            }, 200)
        })
    }
    ,
    t.prototype.closeFilter = function() {
        var t = this;
        this._close.style.display = "none",
        this._close.style.opacity = 0,
        $(this._filter).transition({
            left: "100%"
        }, 350, "easeInCubic", function() {
            t._filter.style.display = "none"
        })
    }
    ,
    t.prototype.setFilter = function(t, i) {
        if ("works" === this._type) {
            if (this._currentWValue == i)
                return;
            this._currentWFilter = t,
            this._currentWValue = i,
            _main._works.setFilter(t, i)
        } else if ("member" === this._type) {
            if (this._currentMValue == i)
                return;
            this._currentMFilter = t,
            this._currentMValue = i,
            _main._member.setFilter(t, i)
        }
        this.closeFilter()
    }
    ,
    t
}()
  , RecruitSet = function() {
    "use strict";
    function t() {
        var t;
        this._width = 1600,
        this._height = 900,
        this._recruit = document.getElementById("recruit"),
        this._mv = document.getElementById("recruit-mv"),
        this._mvImg = document.getElementById("recruit-mv-img"),
        this._wrapper = document.getElementById("wrapper"),
        this._interview = document.getElementById("interview"),
        this._bg = document.getElementById("interview-bg"),
        this._modal = document.getElementById("modal"),
        this._movieWrapp = document.getElementById("modal-movie"),
        this._close = document.getElementById("modal-close"),
        this._yt = document.getElementById("yt"),
        this._border = document.getElementById("recruit-mv-border"),
        "PC" !== _main._device && ((t = document.getElementById("recruit-playmark")).style.width = "22px",
        t.style.height = "22px",
        t.style.marginTop = "2px",
        $(".modal-close-img").css({
            width: "36px",
            height: "36px"
        }),
        "TB" === _main._device && (this._mvImg.style.width = "120%")),
        this.init()
    }
    return t.prototype.init = function() {
        var t = this;
        this._txtWrapper = document.getElementById("recruit-txt");
        var i = $($.parseHTML(_main._parts.getHtml(_main._conf._jsonFileRecruit)));
        this._companyList = [];
        for (var e = i.filter(".out-recruit-company"), s = 0; s < e.length; s++) {
            var h = document.createElement("div");
            "PC" === _main._device ? (h.style.position = "absolute",
            $(window).width() >= _main._conf._borderW ? h.style.width = "490px" : h.style.width = "392px",
            h.style.top = "0",
            h.style.left = "0") : (h.style.position = "inline-block",
            h.style.width = "100%"),
            h.innerHTML = e[s].innerHTML,
            this._companyList.push(h),
            this._txtWrapper.appendChild(h)
        }
        this._txtWrapper.style.height = "1000px",
        this._mv.addEventListener("click", function() {
            t.addModal()
        }, !1),
        "PC" === _main._device && (this._mv.addEventListener("mouseover", function() {
            t.mvOver()
        }, !1),
        this._mv.addEventListener("mouseout", function() {
            t.mvOut()
        }, !1)),
        this._close.addEventListener("click", function() {
            t.removeModal()
        }, !1),
        this._bg.style.width = "1%",
        addResize(this),
        this.onResize()
    }
    ,
    t.prototype.mvOver = function() {
        $(this._mvImg).stop().animate({
            scale: 1.1
        }, 4e3, "easeOutCubic"),
        $(this._border).stop().animate({
            opacity: .3,
            borderWidth: "10px"
        }, 400, "easeOutCubic")
    }
    ,
    t.prototype.mvOut = function() {
        $(this._mvImg).stop().animate({
            scale: 1
        }, 400, "easeOutCubic"),
        $(this._border).stop().animate({
            opacity: 0,
            borderWidth: 0
        }, 400, "easeOutCubic")
    }
    ,
    t.prototype.addModal = function() {
        $(this._modal).css({
            display: "block",
            opacity: 0,
            y: "50"
        }),
        this._bg.style.display = "block",
        this._interview.style.display = "block",
        "PC" === _main._device && (document.body.style.overflow = "hidden");
        var t = this;
        $(this._bg).transition({
            width: "100%"
        }, 400, "easeInCubic", function() {
            t._yt.src = "https://www.youtube.com/embed/txLk-ppuN3k",
            $(t._modal).delay(100).transition({
                opacity: 1,
                y: 0
            }, 400, "easeOutCubic"),
            $(t._close).delay(100).transition({
                opacity: 1
            }, 200, "easeOutCubic"),
            "PC" !== _main._device && (t._scrollY = $(window).scrollTop(),
            $(t._wrapper).css({
                position: "fixed",
                top: -t._scrollY
            }),
            $(window).scrollTop(0))
        })
    }
    ,
    t.prototype.removeModal = function() {
        $(this._interview).scrollTop(0),
        $(this._close).css({
            opacity: 0
        }),
        this._modal.style.display = "none",
        this._yt.src = "about:blank",
        "PC" !== _main._device && ($("#wrapper").attr({
            style: ""
        }),
        $("html, body").prop({
            scrollTop: this._scrollY
        }));
        var t = this;
        $(this._bg).transition({
            width: "1%"
        }, 400, "easeInCubic", function() {
            t._interview.style.display = "none",
            t._bg.style.display = "none",
            "PC" === _main._device && (document.body.style.overflowY = "auto",
            document.body.style.overflowX = "hidden")
        })
    }
    ,
    t.prototype.onResize = function() {
        var t = $(window).width();
        if ("PC" !== _main._device) {
            this._recruit.style.width = t - 40 + "px",
            "SP" !== _main._device && (this._mv.style.height = "200px");
            var i = .9 * t - 40
              , e = i / 16 * 9;
            this._movieWrapp.style.width = i + "px",
            this._movieWrapp.style.height = e + "px";
            for (var s = 0, h = 0; h < this._companyList.length; h++)
                s += $(this._companyList[h]).height();
            this._txtWrapper.style.height = s + 40 + "px"
        } else if (t > _main._conf._borderW) {
            this._recruit.style.width = "1098px",
            this._mv.style.width = "1098px",
            this._mv.style.height = "266px";
            var a = 0
              , o = 0;
            for (h = 0; h < this._companyList.length; h++)
                this._companyList[h].style.width = "490px",
                h % 2 == 0 ? (this._companyList[h].style.left = "0",
                a += $(this._companyList[h]).height()) : (this._companyList[h].style.left = "610px",
                o += $(this._companyList[h]).height()),
                2 <= h && (this._companyList[h].style.top = String($(this._companyList[h - 2]).height() + "px")),
                this._txtWrapper.style.height = Math.max(a, o) + 80 + "px"
        } else {
            this._recruit.style.width = "1098px",
            this._mv.style.width = "1098px",
            this._mv.style.height = "266px";
            a = 0,
            o = 0;
            for (h = 0; h < this._companyList.length; h++)
                this._companyList[h].style.width = "392px",
                h % 2 == 0 ? (this._companyList[h].style.left = "0",
                a += $(this._companyList[h]).height()) : (this._companyList[h].style.left = "508px",
                o += $(this._companyList[h]).height()),
                2 <= h && (this._companyList[h].style.top = String($(this._companyList[h - 2]).height() + "px")),
                this._txtWrapper.style.height = Math.max(a, o) + 80 + "px"
        }
    }
    ,
    t
}()
  , SceneMng = function() {
    "use strict";
    function t() {
        this.init()
    }
    return t.prototype.init = function() {
        this._status = "top",
        this._page = "top",
        this._scrollY = 0,
        this.isMap = !1
    }
    ,
    t.prototype.contentsStart = function() {
        addResize(this),
        this.onResize(),
        _main.addEnterFrame(this, "enterFrame")
    }
    ,
    t.prototype.enterFrame = function() {
        this._scrollY = $(window).scrollTop(),
        this._scrollY <= 150 ? "top" !== this._status && (this._status = "top",
        _main.changeMode("top")) : "top" === this._status && (this._status = "under0",
        _main.changeMode("under0")),
        _main._header.checkVisible(this._scrollY),
        this._scrollY > this._topY && this._scrollY < this._topH ? "top" !== this._page && (this._page = "top") : this._scrollY > this._worksY && this._scrollY < this._worksY + this._worksH ? "works" !== this._page && (this._page = "works",
        _main._works.start()) : this._scrollY > this._memberY && this._scrollY < this._memberY + this._memberH ? "member" !== this._page && (this._page = "member",
        _main._member.start()) : this._scrollY > this._aboutY && this._scrollY < this._aboutY + this._aboutH ? "about" !== this._page && (this._page = "about") : this._scrollY > this._recruitY && this._scrollY < this._recruitY + this._recruitH && "recruit" !== this._page && (this._page = "recruit"),
        this._scrollY > this._aboutY && this._scrollY < this._aboutY + window.innerHeight + 300 ? this.isMap = !0 : this.isMap = !1
    }
    ,
    t.prototype.pageSlide = function(t) {
        var i;
        _main._works._detail.allClear(),
        _main._member._detail.allClear(),
        i = "PC" === _main._device ? 200 : 100;
        var e = 0;
        "top" === t ? e = 0 : "works" === t ? e = $("#works").offset().top - i : "member" === t ? e = $("#member").offset().top - i : "about" === t ? e = $("#about").offset().top - i : "recruit" === t ? e = $("#recruit").offset().top - i : "contact" === t && (e = $("#contact").offset().top - i),
        $("html, body").stop().animate({
            scrollTop: e
        }, 750, "easeOutQuint")
    }
    ,
    t.prototype.detailSlide = function(t) {
        $("html, body").stop().animate({
            scrollTop: t - 100
        }, 700, "easeOutQuint")
    }
    ,
    t.prototype.onResize = function() {
        this._topY = 0,
        this._topH = $(window).height(),
        this._worksY = $("#works").offset().top - $(window).height(),
        this._worksH = $("#works").height(),
        this._memberY = $("#member").offset().top - $(window).height(),
        this._memberH = $("#member").height(),
        this._aboutY = $("#about").offset().top - $(window).height(),
        this._aboutH = $("#about").height(),
        this._recruitY = $("#recruit").offset().top - $(window).height(),
        this._recruitH = $("#recruit").height()
    }
    ,
    t
}()
  , StartCover = function() {
    "use strict";
    function t() {
        this.init()
    }
    return t.prototype.init = function() {
        this._cover = document.getElementById("start-cover"),
        document.body.style.overflow = "hidden",
        this._bar1 = document.getElementById("start-loading-bar1"),
        this._bar2 = document.getElementById("start-loading-bar2"),
        this._bar3 = document.getElementById("start-loading-bar3"),
        this._bar4 = document.getElementById("start-loading-bar4");
        var t = this;
        $(this._bar1).delay(100).animate({
            opacity: 0
        }, 300, function() {
            t.fadeIn(1)
        }),
        $(this._bar2).delay(400).animate({
            opacity: 0
        }, 300, function() {
            t.fadeIn(2)
        }),
        $(this._bar3).delay(200).animate({
            opacity: 0
        }, 300, function() {
            t.fadeIn(3)
        }),
        $(this._bar4).delay(300).animate({
            opacity: 0
        }, 300, function() {
            t.fadeIn(4)
        })
    }
    ,
    t.prototype.fadeIn = function(t) {
        var i = this
          , e = 100 * (Math.ceil(4 * Math.random()) + 1);
        1 === t ? $(this._bar1).stop().delay(e).animate({
            opacity: 1
        }, e, function() {
            i.fadeOut(1)
        }) : 2 === t ? $(this._bar2).stop().delay(e).animate({
            opacity: 1
        }, e, function() {
            i.fadeOut(2)
        }) : 3 === t ? $(this._bar3).stop().delay(e).animate({
            opacity: 1
        }, e, function() {
            i.fadeOut(3)
        }) : 4 === t && $(this._bar4).stop().delay(e).animate({
            opacity: 1
        }, e, function() {
            i.fadeOut(4)
        })
    }
    ,
    t.prototype.fadeOut = function(t) {
        var i = this
          , e = 100 * (Math.ceil(4 * Math.random()) + 1);
        1 === t ? $(this._bar1).stop().delay(e).animate({
            opacity: 0
        }, e, function() {
            i.fadeIn(1)
        }) : 2 === t ? $(this._bar2).stop().delay(e).animate({
            opacity: 0
        }, e, function() {
            i.fadeIn(2)
        }) : 3 === t ? $(this._bar3).stop().delay(e).animate({
            opacity: 0
        }, e, function() {
            i.fadeIn(3)
        }) : 4 === t && $(this._bar4).stop().delay(e).animate({
            opacity: 0
        }, e, function() {
            i.fadeIn(4)
        })
    }
    ,
    t.prototype.hide = function() {
        document.body.style.overflow = "auto",
        "PC" !== _main._device && (document.body.style.overflowX = "hidden"),
        _main._world._lineSet.contentsStart();
        var t = this;
        $(this._cover).transition({
            width: 1
        }, 500, "easeInCubic", function() {
            document.body.removeChild(t._cover)
        })
    }
    ,
    t
}()
  , TopSet = function() {
    "use strict";
    function t() {
        this.init()
    }
    return t.prototype.init = function() {
        this._newsCount = 0,
        this._data = _main._jsonMng.getJson(_main._conf._jsonFile).news.entries,
        this._news = document.getElementById("top-news"),
        this._left = document.getElementById("top-news-l"),
        this._right = document.getElementById("top-news-r"),
        this._textWrapp = document.getElementById("top-news-t"),
        this._text = document.getElementById("top-news-t-in"),
        this._menu1 = document.getElementById("main-menu-a1"),
        this._menu2 = document.getElementById("main-menu-a2"),
        this._menu3 = document.getElementById("main-menu-a3"),
        this._menu4 = document.getElementById("main-menu-a4"),
        this._menu5 = document.getElementById("main-menu-a5"),
        this._menu6 = document.getElementById("main-menu-a6"),
        this._link1 = document.getElementById("main-menu-a1"),
        this._link2 = document.getElementById("main-menu-a2"),
        this._link3 = document.getElementById("main-menu-a3"),
        this._link4 = document.getElementById("main-menu-a4"),
        this._link5 = document.getElementById("main-menu-a5"),
        this._link6 = document.getElementById("main-menu-a6"),
        this._linkList = [this._link1, this._link2, this._link3, this._link4, this._link5, this._link6],
        this._bar = document.getElementById("menu-bar"),
        "PC" === _main._device ? this.setNewsPC() : this.setNewsSP()
    }
    ,
    t.prototype.changeMode = function(t) {
        _main.removeEnterFrame(this),
        "top" === t && (this._timer = 0,
        _main.addEnterFrame(this, "timerFrame"))
    }
    ,
    t.prototype.setNewsPC = function() {
        var t = this._data[this._newsCount].date
          , i = this._data[this._newsCount].news
          , e = this._data[this._newsCount].url;
        if (16 < i.length) {
            for (var s = "", h = 0; h < 15; h++)
                s += i.charAt(h);
            i = s += "…"
        }
        var a = document.createElement("div");
        a.style.position = "absolute",
        a.style.opacity = 0,
        a.innerHTML = t + i,
        document.body.appendChild(a);
        var o = $(a).text(a.innerHTML).get(0).offsetWidth + 60;
        document.body.removeChild(a),
        a.innerHTML = "",
        a = null,
        this._news.style.width = o + "px",
        this._news.style.marginLeft = .5 * -o + "px",
        this._text.style.width = o + "px",
        this._text.innerHTML = String("<a href='" + e + "'>" + t + "&nbsp;&nbsp;" + i + "</a>"),
        $(this._textWrapp).transition({
            left: 0,
            right: 0
        }, 400, "easeOutCubic"),
        $(this._left).transition({
            left: 0
        }, 400, "easeOutCubic"),
        $(this._right).transition({
            right: 0
        }, 400, "easeOutCubic"),
        this._timer = 0,
        _main.addEnterFrame(this, "timerFrame")
    }
    ,
    t.prototype.setNewsSP = function() {
        var t = this._data[this._newsCount].date
          , i = this._data[this._newsCount].news
          , e = this._data[this._newsCount].url;
        if (16 < i.length) {
            for (var s = "", h = 0; h < 15; h++)
                s += i.charAt(h);
            i = s += "…"
        }
        var a = document.createElement("div");
        a.style.position = "absolute",
        a.style.opacity = 0,
        a.innerHTML = i,
        document.body.appendChild(a);
        var o = $(a).text(a.innerHTML).get(0).offsetWidth + 20;
        document.body.removeChild(a),
        a.innerHTML = "",
        a = null,
        this._textWrapp.style.width = o + "px",
        this._text.innerHTML = t + "<br>" + i,
        this._text.addEventListener("click", function() {
            location.href = e
        }, !1),
        $(this._textWrapp).delay(400).css({
            width: "1px"
        }).transition({
            opacity: 1,
            width: o + "px"
        }, 400, "easeOutCubic"),
        this._timer = 0,
        _main.addEnterFrame(this, "timerFrame")
    }
    ,
    t.prototype.timerFrame = function() {
        var t;
        this._timer++,
        540 < this._timer && (_main.removeEnterFrame(this),
        this._timer = 0,
        this._newsCount++,
        this._newsCount >= this._data.length && (this._newsCount = 0),
        t = this,
        "PC" === _main._device ? ($(this._textWrapp).transition({
            left: "49%",
            right: "49%"
        }, 400, "easeOutCubic"),
        $(this._left).transition({
            left: "44%"
        }, 400, "easeOutCubic"),
        $(this._right).transition({
            right: "44%"
        }, 400, "easeOutCubic", function() {
            t._text.innerHTML = "",
            t.setNewsPC()
        })) : $(this._textWrapp).transition({
            width: 1
        }, 400, "easeOutCubic", function() {
            t._textWrapp.style.opacity = 0,
            t._text.innerHTML = "",
            t.setNewsSP()
        }))
    }
    ,
    t.prototype.contentsStart = function() {
        var t = this;
        "PC" === _main._device && (this._menu1.addEventListener("mouseenter", function() {
            t.mOver(1)
        }, !1),
        this._menu2.addEventListener("mouseenter", function() {
            t.mOver(2)
        }, !1),
        this._menu3.addEventListener("mouseenter", function() {
            t.mOver(3)
        }, !1),
        this._menu4.addEventListener("mouseenter", function() {
            t.mOver(4)
        }, !1),
        this._menu5.addEventListener("mouseenter", function() {
            t.mOver(5)
        }, !1),
        this._menu6.addEventListener("mouseenter", function() {
            t.mOver(6)
        }, !1),
        this._menu1.addEventListener("mouseleave", function() {
            t.mOut(1)
        }, !1),
        this._menu2.addEventListener("mouseleave", function() {
            t.mOut(2)
        }, !1),
        this._menu3.addEventListener("mouseleave", function() {
            t.mOut(3)
        }, !1),
        this._menu4.addEventListener("mouseleave", function() {
            t.mOut(4)
        }, !1),
        this._menu5.addEventListener("mouseleave", function() {
            t.mOut(5)
        }, !1),
        this._menu6.addEventListener("mouseleave", function() {
            t.mOut(6)
        }, !1)),
        this._menu1.addEventListener("click", function() {
            t.mClick(1)
        }, !1),
        this._menu2.addEventListener("click", function() {
            t.mClick(2)
        }, !1),
        this._menu3.addEventListener("click", function() {
            t.mClick(3)
        }, !1),
        this._menu4.addEventListener("click", function() {
            t.mClick(4)
        }, !1),
        this._menu5.addEventListener("click", function() {
            window.location.href = "/news/"
        }, !1),
        this._menu6.addEventListener("click", function() {
            window.location.href = "/contact/"
        }, !1)
    }
    ,
    t.prototype.mOver = function(t) {
        var i = $(this._linkList[t - 1]).offset().left
          , t = $(this._linkList[t - 1]).width();
        $(this._bar).stop().animate({
            opacity: 1,
            left: i + "px",
            width: t + "px"
        }, 300, "easeOutCubic")
    }
    ,
    t.prototype.mOut = function(t) {
        $(this._bar).stop().animate({
            opacity: 0,
            width: "1px"
        }, 300, "easeOutCubic")
    }
    ,
    t.prototype.mClick = function(t) {
        var i = "";
        1 === t ? i = "works" : 2 === t ? i = "member" : 3 === t ? i = "about" : 4 === t ? i = "recruit" : 6 === t && (i = "contact"),
        _main._sceneMng.pageSlide(i)
    }
    ,
    t
}()
  , TopTitle = function() {
    "use strict";
    function t() {
        this.init()
    }
    return t.prototype.init = function() {
        var t;
        this._count = 0,
        this._count2 = 0,
        this._radius = 4,
        this._scale = 1,
        this._baseX = 0,
        this._baseY = 48,
        this._shiftY = 30,
        t = "PC" === _main._device ? (1700 <= window.parent.screen.width && (this._shiftY = 0),
        t = Math.ceil(.56 * window.parent.screen.width),
        this._scale = t / 1500,
        this._geo = new THREE.PlaneBufferGeometry(1500,74,2,2),
        _main._parts.getTex("assets/image/top_logo.png")) : (this._shiftY = 0,
        this._scale = .5,
        this._geo = new THREE.PlaneBufferGeometry(500,254,2,2),
        _main._parts.getTex("assets/image/top_logo_sp.png")),
        this._shader1 = {
            vertexShader: _main._parts.getShader("assets/shader/topTitle_vtx.js"),
            fragmentShader: _main._parts.getShader("assets/shader/topTitle_frg.js"),
            uniforms: {
                texture: {
                    value: t
                },
                rr: {
                    value: 1
                },
                gg: {
                    value: 0
                },
                bb: {
                    value: 0
                },
                aa: {
                    value: .4
                }
            },
            transparent: !0
        },
        this._mat1 = new THREE.ShaderMaterial(this._shader1),
        this._mesh1 = new THREE.Mesh(this._geo,this._mat1),
        this._mesh1.position.x = 0,
        this._mesh1.scale.set(this._scale, this._scale, this._scale),
        _main._world._scene.add(this._mesh1),
        this._shader2 = {
            vertexShader: _main._parts.getShader("assets/shader/topTitle_vtx.js"),
            fragmentShader: _main._parts.getShader("assets/shader/topTitle_frg.js"),
            uniforms: {
                texture: {
                    value: t
                },
                rr: {
                    value: 0
                },
                gg: {
                    value: .6
                },
                bb: {
                    value: 1
                },
                aa: {
                    value: .4
                }
            },
            transparent: !0
        },
        this._mat2 = new THREE.ShaderMaterial(this._shader2),
        this._mesh2 = new THREE.Mesh(this._geo,this._mat2),
        this._mesh2.position.x = 0,
        this._mesh2.scale.set(this._scale, this._scale, this._scale),
        _main._world._scene.add(this._mesh2),
        this._shader3 = {
            vertexShader: _main._parts.getShader("assets/shader/topTitle_vtx.js"),
            fragmentShader: _main._parts.getShader("assets/shader/topTitle_frg.js"),
            uniforms: {
                texture: {
                    value: t
                },
                rr: {
                    value: 1
                },
                gg: {
                    value: 1
                },
                bb: {
                    value: 1
                },
                aa: {
                    value: 1
                }
            },
            transparent: !0
        },
        this._mat3 = new THREE.ShaderMaterial(this._shader3),
        this._mesh3 = new THREE.Mesh(this._geo,this._mat3),
        this._mesh3.position.x = 0,
        this._mesh3.scale.set(this._scale, this._scale, this._scale),
        _main._world._scene.add(this._mesh3),
        "PC" !== _main._device && (addResize(this),
        this.onResize(),
        this._mesh1.position.x = this._baseX,
        this._mesh1.position.y = this._baseY,
        this._mesh2.position.x = this._baseX,
        this._mesh2.position.y = this._baseY,
        this._mesh3.position.x = this._baseX,
        this._mesh3.position.y = this._baseY),
        _main.addEnterFrame(this, "enterFrame")
    }
    ,
    t.prototype.enterFrame = function() {
        this._mesh3.position.y = this._baseY + 1.2 * _main._world._scrollTop - this._shiftY,
        this._mesh2.position.y = .5 * this._mesh2.position.y + .5 * this._mesh3.position.y,
        this._mesh1.position.y = .6 * this._mesh1.position.y + .4 * this._mesh3.position.y,
        this._count = (this._count + 12) % 360;
        Math.sin(this._count * Math.PI / 180);
        var t = Math.cos(this._count * Math.PI / 180);
        this._mesh1.position.x = this._baseX + t * this._radius,
        this._mesh2.position.x = this._baseX + t * -this._radius,
        this._count2++,
        30 < this._count2 && (this._count2 = 0,
        this._radius = 4 * Math.random() + 1)
    }
    ,
    t.prototype.onResize = function() {
        var t = -.5 * $(window).width()
          , i = .5 * $(window).height();
        this._baseX = 125 + t,
        this._baseY = i - 64,
        this._mesh3.position.x = this._baseX,
        this._mesh3.position.y = this._baseY
    }
    ,
    t
}()
  , UnderHeader = function() {
    "use strict";
    function t() {
        this.isOpen = !1,
        this.isOut = !1,
        this.outCount = 0,
        this.isVisible = !1,
        this.init()
    }
    return t.prototype.init = function() {
        this._header = document.getElementById("under-header"),
        this._header.style.display = "none",
        this._headerIn = document.getElementById("under-header-in"),
        this._headerIn.style.top = "-200px",
        this._close = document.getElementById("header-menu"),
        this._open = document.getElementById("header-menu-open"),
        this._menu1 = document.getElementById("header-menu1"),
        this._menu2 = document.getElementById("header-menu2"),
        this._menu3 = document.getElementById("header-menu3"),
        this._menu4 = document.getElementById("header-menu4"),
        this._menu5 = document.getElementById("header-menu5"),
        this._menu6 = document.getElementById("header-menu6"),
        this._menu7 = document.getElementById("header-menu7")
    }
    ,
    t.prototype.contentsStart = function() {
        var t;
        "PC" === _main._device && ((t = this)._close.addEventListener("mouseover", function() {
            t.menuOpen()
        }, !1),
        this._open.addEventListener("mouseout", function() {
            t.openOut()
        }, !1),
        this._open.addEventListener("mouseover", function() {
            t.openOver()
        }, !1),
        this._menu1.addEventListener("click", function() {
            _main._sceneMng.pageSlide("top")
        }, !1),
        this._menu2.addEventListener("click", function() {
            _main._sceneMng.pageSlide("works")
        }, !1),
        this._menu3.addEventListener("click", function() {
            _main._sceneMng.pageSlide("member")
        }, !1),
        this._menu4.addEventListener("click", function() {
            _main._sceneMng.pageSlide("about")
        }, !1),
        this._menu5.addEventListener("click", function() {
            _main._sceneMng.pageSlide("recruit")
        }, !1),
        this._menu6.addEventListener("click", function() {
            location.href = "/news/"
        }, !1),
        this._menu7.addEventListener("click", function() {
            location.href = "/contact/"
        }, !1))
    }
    ,
    t.prototype.menuOpen = function() {
        "PC" === _main._device && (this.isOpen || (this._open.style.opacity = 0,
        this._open.style.display = "block",
        this.isOpen = !0,
        this.outCount = 0,
        this.isOut = !1,
        _main.removeEnterFrame(this),
        _main.addEnterFrame(this, "outFrame"),
        $(this._open).stop().animate({
            opacity: 1,
            left: 0
        }, 300, "easeOutCubic"),
        $(this._close).stop().animate({
            left: "-140px"
        }, 300, "easeOutCubic")))
    }
    ,
    t.prototype.outFrame = function() {
        var t;
        this.isOut && (this.outCount++,
        30 <= this.outCount && (_main.removeEnterFrame(this),
        this.isOpen = !1,
        t = this,
        $(this._open).stop().animate({
            opacity: 0,
            left: "-200px"
        }, 300, "easeOutCubic", function() {
            t._open.style.display = "none"
        }),
        $(this._close).stop().animate({
            left: 0
        }, 300, "easeOutCubic")))
    }
    ,
    t.prototype.openOut = function() {
        this.isOpen && (this.isOut = !0)
    }
    ,
    t.prototype.openOver = function() {
        this.isOpen && (this.isOut = !1,
        this.outCount = 0,
        $(this._open).stop().animate({
            opacity: 1,
            left: 0
        }, 300, "easeOutCubic"))
    }
    ,
    t.prototype.checkVisible = function(t) {
        var i;
        "PC" === _main._device && (i = this,
        t >= $(window).height() ? this.isVisible || (this.isVisible = !0,
        this._header.style.display = "block",
        $(this._headerIn).transition({
            top: 0
        }, 400, "easeOutCubic")) : this.isVisible && (this.isVisible = !1,
        $(this._headerIn).transition({
            top: "-200px"
        }, 400, "easeOutCubic", function() {
            i._header.style.display = "none"
        })))
    }
    ,
    t
}()
  , UnderHeaderSp = function() {
    "use strict";
    function t() {
        this.isOpen = !1,
        this.isVisible = !1,
        this.init()
    }
    return t.prototype.init = function() {
        this._wait = 0,
        this._width = $(window).width(),
        this._logoW = 601,
        this._margin = 20,
        this._trgX1 = 0,
        this._trgX2 = this._logoW + this._margin,
        this._header = document.getElementById("under-header-sp"),
        this._header.style.display = "none",
        this._headerIn = document.getElementById("under-header-sp-in"),
        $(this._headerIn).css({
            y: -100
        }),
        this._menu = document.getElementById("header-menu-sp"),
        this._logo1 = document.getElementById("header-logo-sp-f"),
        this._logo2 = document.getElementById("header-logo-sp-s"),
        $(this._logo1).css({
            z: 0,
            x: 0
        }),
        $(this._logo2).css({
            z: 0,
            x: this._logoW + this._margin
        }),
        this._menuOp = document.getElementById("sp-menu"),
        this._menuIn = document.getElementById("sp-menu-set"),
        this._close = document.getElementById("sp-menu-close"),
        this._menu0 = document.getElementById("sp-menu-a0"),
        this._menu1 = document.getElementById("sp-menu-a1"),
        this._menu2 = document.getElementById("sp-menu-a2"),
        this._menu3 = document.getElementById("sp-menu-a3"),
        this._menu4 = document.getElementById("sp-menu-a4"),
        this._menu5 = document.getElementById("sp-menu-a5"),
        this._menu6 = document.getElementById("sp-menu-a6"),
        this._fb = document.getElementById("sp-menu-fb")
    }
    ,
    t.prototype.contentsStart = function() {
        var t = this;
        this._menu.addEventListener("click", function() {
            t.menuOpen()
        }, !1),
        this._close.addEventListener("click", function() {
            t.menuClose()
        }, !1),
        this._menu0.addEventListener("click", function() {
            t.pageSlide("top")
        }, !1),
        this._menu1.addEventListener("click", function() {
            t.pageSlide("works")
        }, !1),
        this._menu2.addEventListener("click", function() {
            t.pageSlide("member")
        }, !1),
        this._menu3.addEventListener("click", function() {
            t.pageSlide("about")
        }, !1),
        this._menu4.addEventListener("click", function() {
            t.pageSlide("recruit")
        }, !1),
        this._menu5.addEventListener("click", function() {
            location.href = "/news/"
        }, !1),
        this._menu6.addEventListener("click", function() {
            location.href = "/contact/"
        }, !1)
    }
    ,
    t.prototype.menuOpen = function() {
        var t;
        this.isOpen || ($(this._menuIn).css({
            x: "100%"
        }),
        this._menuOp.style.display = "block",
        $(this._menuOp).css({
            x: "100%"
        }),
        t = this,
        $(this._menuOp).transition({
            x: 0
        }, 300, "easeOutCubic"),
        $(this._menuIn).delay(250).transition({
            x: 0
        }, 350, "easeOutCubic", function() {
            t.isOpen = !0
        }),
        $(window).on("touchmove.noScroll", function(t) {
            t.preventDefault()
        }))
    }
    ,
    t.prototype.menuClose = function() {
        this.isOpen = !1,
        $(window).off(".noScroll");
        var t = this;
        $(this._menuOp).transition({
            x: "100%"
        }, 350, "easeOutCubic"),
        $(this._menuIn).transition({
            x: "100%"
        }, 350, "easeOutCubic", function() {
            t._menuOp.style.display = "none"
        })
    }
    ,
    t.prototype.pageSlide = function(t) {
        $(window).off(".noScroll"),
        this.menuClose(),
        _main._sceneMng.pageSlide(t)
    }
    ,
    t.prototype.checkVisible = function(t) {
        var i;
        t >= $(window).height() ? this.isVisible || (this.isVisible = !0,
        this._header.style.display = "block",
        i = this,
        $(this._headerIn).css({
            y: -100
        }).transition({
            y: 0
        }, 400, "easeOutCubic", function() {
            _main.removeEnterFrame(i),
            _main.addEnterFrame(i, "enterFrame")
        })) : this.isVisible && (this.isVisible = !1,
        _main.removeEnterFrame(this),
        i = this,
        $(this._headerIn).transition({
            y: -100
        }, 400, "easeOutCubic", function() {
            i._header.style.display = "none"
        }))
    }
    ,
    t.prototype.enterFrame = function() {
        this._wait++,
        this._wait < 2 || (this._wait = 0,
        --this._trgX1,
        this._trgX1 <= -this._logoW && (this._trgX1 = this._trgX2 + this._logoW + this._margin),
        $(this._logo1).css({
            x: this._trgX1
        }),
        --this._trgX2,
        this._trgX2 <= -this._logoW && (this._trgX2 = this._trgX1 + this._logoW + this._margin),
        $(this._logo2).css({
            x: this._trgX2
        }))
    }
    ,
    t
}()
  , WorksCaset = function() {
    "use strict";
    function t(t) {
        this._wait = 0,
        this.isSet = !1,
        this.isCancel = !1,
        this._parm = t,
        this._parent = this._parm.parent,
        this._data = this._parm.data,
        this._num = this._parm.num,
        this.init()
    }
    return t.prototype.init = function() {
        var t;
        this._stage = this._parm.stage,
        this._wrapper = document.createElement("div"),
        this._wrapper.style.display = "inline-block",
        this._wrapper.style.position = "relative",
        this._wrapper.style.width = this._parent._width + "px",
        this._wrapper.style.height = this._parent._height + "px",
        null !== this._data && (this._wrapper.style.cursor = "pointer",
        this._effect = document.createElement("div"),
        this._effect.style.position = "absolute",
        this._effect.style.width = "100%",
        this._effect.style.height = "100%",
        this._effect.style.overflow = "hidden",
        this._effect.style.backgroundColor = "#121212",
        this._wrapper.appendChild(this._effect),
        this._imgSet = document.createElement("div"),
        this._imgSet.style.position = "absolute",
        this._imgSet.style.width = "100%",
        this._imgSet.style.height = "100%",
        $(this._imgSet).css({
            y: "60%",
            opacity: 0
        }),
        this._effect.appendChild(this._imgSet),
        this._over = document.createElement("div"),
        this._over.style.width = "100%",
        this._over.style.height = "100%",
        this._over.style.position = "absolute",
        this._over.style.backgroundColor = "#000000",
        this._over.style.opacity = 0,
        this._over.style.display = "none",
        "Edge" !== _main._ua.BROWSER && "IE" !== _main._ua.BROWSER && $(this._over).css({
            scale: 1.5
        }),
        this._effect.appendChild(this._over),
        this._overM = document.createElement("div"),
        this._overM.style.position = "absolute",
        this._overM.style.width = "42px",
        this._overM.style.height = "76px",
        this._overM.style.left = "50%",
        this._overM.style.top = "50%",
        this._overM.style.marginLeft = "-21px",
        this._overM.style.marginTop = "-38px",
        this._overM.innerHTML = "<img src='assets/image/img_over_mark.png' width='100%' height='100%' alt=''/>",
        this._over.appendChild(this._overM),
        this._evt = document.createElement("div"),
        this._evt.style.width = "100%",
        this._evt.style.height = "100%",
        this._evt.style.position = "absolute",
        this._evt.style.backgroundColor = "#000000",
        this._evt.style.opacity = 0,
        this._effect.appendChild(this._evt),
        t = this,
        "PC" === _main._device && (this._evt.addEventListener("mouseover", function() {
            t.mOver()
        }),
        this._evt.addEventListener("mouseout", function() {
            t.mOut()
        })),
        this._evt.addEventListener("click", function() {
            t.mClick()
        })),
        this._stage.appendChild(this._wrapper),
        "detail" === this._parm.type && this.loadImg()
    }
    ,
    t.prototype.loadImg = function() {
        var t, i;
        null !== this._data && (t = new Image,
        i = this,
        t.onload = function(t) {
            i.loadComp(t)
        }
        ,
        t.src = this._data.index_img)
    }
    ,
    t.prototype.loadComp = function(t) {
        t = t.target;
        t.style.width = "100%",
        t.style.height = "100%",
        this._imgSet.appendChild(t),
        _main.addEnterFrame(this, "waitFrame")
    }
    ,
    t.prototype.waitFrame = function() {
        var t;
        this._wait++,
        15 <= this._wait && (_main.removeEnterFrame(this),
        "list" !== this._parm.type || this.isCancel || this._parent.loadImgComp(),
        t = this,
        $(this._imgSet).transition({
            y: "0%",
            opacity: 1
        }, 400, "easeOutCubic", function() {
            t.isSet = !0
        }))
    }
    ,
    t.prototype.mOver = function() {
        this.isSet && (this._over.style.display = "block",
        "Edge" === _main._ua.BROWSER || "IE" === _main._ua.BROWSER ? $(this._over).stop().css({
            left: "-50%"
        }).animate({
            left: 0,
            opacity: .6
        }, 350, "easeOutCubic") : ($(this._over).stop().animate({
            opacity: .5,
            scale: 1
        }, 350, "easeOutCubic"),
        $(this._imgSet).stop().animate({
            scale: 1.15
        }, 3500, "easeOutCubic")))
    }
    ,
    t.prototype.mOut = function() {
        var t;
        this.isSet && (t = this,
        "Edge" === _main._ua.BROWSER || "IE" === _main._ua.BROWSER ? $(this._over).stop().animate({
            left: "-50%",
            opacity: 0
        }, 400, "easeOutCubic", function() {
            t._over.style.display = "none"
        }) : ($(this._over).stop().animate({
            opacity: 0,
            scale: 1.5
        }, 400, "easeOutCubic", function() {
            t._over.style.display = "none"
        }),
        $(this._imgSet).stop().animate({
            scale: 1
        }, 400, "easeOutCubic")))
    }
    ,
    t.prototype.mClick = function() {
        var t;
        this.isSet && ("list" === this._parm.type ? ((t = {}).id = this._data.id,
        t.target = this._effect,
        this._parent.addDetail(t)) : "detail" === this._parm.type && this._parent.gotoWorks(this._data.id))
    }
    ,
    t.prototype.clear = function() {
        this.isCancel = !0,
        _main.removeEnterFrame(this),
        this._stage.removeChild(this._wrapper),
        this._wrapper = null
    }
    ,
    t.prototype.onResize = function() {
        this._wrapper.style.width = this._parent._width + "px",
        this._wrapper.style.height = this._parent._height + "px",
        null !== this._data && (this._effect.style.width = "100%",
        this._effect.style.height = "100%",
        this._imgSet.style.width = "100%",
        this._imgSet.style.height = "100%",
        this._over.style.width = "100%",
        this._over.style.height = "100%")
    }
    ,
    t
}()
  , WorksDetail = function() {
    "use strict";
    function t(t) {
        this._parent = t,
        this._parm = null,
        this._top = 0,
        this._width = 0,
        this._height = 0,
        this._bgW = 0,
        this._bgH = 0,
        this._bgT = 0,
        this.isOpen = !1,
        this._stageW = 0,
        this._relatedList = [],
        this._autoCount = 0,
        this._autoCurrent = 0,
        this.init()
    }
    return t.prototype.init = function() {
        this._stage = document.getElementById("works-detail"),
        this._bg = document.getElementById("works-detail-bg"),
        this._imgList = [],
        this._img = document.getElementById("works-detail-img"),
        this._imgCo = document.getElementById("works-detail-img-co"),
        this._imgIn = document.getElementById("works-detail-img-in"),
        this._txt = document.getElementById("works-detail-txt"),
        this._related = document.getElementById("works-detail-related"),
        this._close = document.getElementById("works-detail-close"),
        this._point = document.getElementById("works-detail-point"),
        this._ex = document.getElementById("works-detail-ex"),
        "PC" !== _main._device && (this._close.innerHTML = "<img src='assets/image/modal_close_sp.png' width='100%' height='100%' alt='' />",
        this._close.style.width = "37px",
        this._close.style.height = "46px"),
        this._link = document.createElement("div"),
        this._link.style.position = "absolute",
        this._link.style.width = "100px",
        this._link.style.height = "34px",
        this._link.style.bottom = "10px",
        this._link.style.left = "10px",
        this._link.style.zIndex = 200,
        this._link.style.transformOrigin = "bottom left",
        this._img.appendChild(this._link),
        this._linkBg = document.createElement("div"),
        this._linkBg.style.position = "absolute",
        this._linkBg.style.width = "100%",
        this._linkBg.style.height = "100%",
        this._linkBg.style.top = 0,
        this._linkBg.style.left = 0,
        this._linkBg.style.backgroundColor = "#000000",
        this._linkBg.style.border = "solid 2px rgba(255, 255, 255, 0.8)",
        this._linkBg.style.borderRadius = "17px",
        this._linkBg.style.boxSizing = "border-box",
        this._link.appendChild(this._linkBg),
        this._linkT = document.createElement("div"),
        this._linkT.style.position = "absolute",
        this._linkT.style.width = "100%",
        this._linkT.style.height = "100%",
        this._linkT.style.top = 0,
        this._linkT.style.left = 0,
        this._linkT.style.backgroundImage = "url(assets/image/work_link.png)",
        this._linkT.style.backgroundSize = "contain",
        this._linkT.style.position = "center center",
        this._link.appendChild(this._linkT),
        this._linkA = document.createElement("a"),
        this._linkA.style.position = "absolute",
        this._linkA.style.width = "100%",
        this._linkA.style.height = "100%",
        this._linkA.style.top = 0,
        this._linkA.style.left = 0,
        this._linkA.setAttribute("href", "#"),
        this._linkA.setAttribute("target", "_blank"),
        this._link.appendChild(this._linkA);
        var t = this;
        "PC" == _main._device ? (this._linkA.addEventListener("mouseenter", function() {
            $(t._linkBg).transition({
                opacity: .5
            }, 200, "easeOutCubic")
        }, !1),
        this._linkA.addEventListener("mouseleave", function() {
            $(t._linkBg).transition({
                opacity: 1
            }, 200, "easeOutCubic")
        }, !1)) : this._link.style.transform = "scale(0.8, 0.8)",
        this._close.addEventListener("click", function() {
            t.closeDetail()
        }, !1),
        this._bg.addEventListener("click", function() {
            t.isOpen && t.closeDetail()
        }, !1)
    }
    ,
    t.prototype.addDetail = function(t) {
        this._parm = t,
        this.onResize(),
        this._stage.style.display = "block",
        this._stage.style.opacity = 0,
        this._stage.style.width = "1px",
        this._bg.style.display = "block",
        $(this._bg).transition({
            opacity: .75
        }, 300, "easeOutCubic"),
        _main._sceneMng.detailSlide(this._top),
        _main._api.getWorksDetail(this._parm.id)
    }
    ,
    t.prototype.setWorksData = function(t) {
        this._data = t;
        var i = 0;
        for (this._loadList = [],
        i = 0; i < this._data.detail_img.length; i++)
            this._loadList.push(this._data.detail_img[i]);
        for (i = 0; i < this._data.member.length; i++)
            this._loadList.push(this._data.member[i].index_img);
        "" != this._data.link && null != this._data.link ? (this._linkA.setAttribute("href", this._data.link),
        this._link.style.display = "block") : (this._linkA.setAttribute("href", "#"),
        this._link.style.display = "none"),
        _main._ring.setLoading("works", this._stage),
        this._loadCount = 0,
        this.loadImgStart()
    }
    ,
    t.prototype.loadImgStart = function() {
        var t = new Image
          , i = this;
        t.onload = function() {
            i.loadCheck()
        }
        ,
        t.src = this._loadList[this._loadCount]
    }
    ,
    t.prototype.loadCheck = function() {
        if (this._loadCount++,
        this._loadCount >= this._loadList.length) {
            for (s = 0; s < this._data.detail_img.length; s++) {
                var t = document.createElement("div");
                t.style.position = "absolute",
                t.style.top = "0px",
                t.style.width = 2 * this._width + "px",
                t.style.height = 2 * this._height + "px",
                t.innerHTML = "<img src='" + this._data.detail_img[s] + "' width='" + 2 * this._width + "' height='" + 2 * this._height + "' alt='' />",
                0 < s && (t.style.opacity = 0,
                t.style.display = "none",
                $(t).css({
                    scale: 1.5
                })),
                this._imgIn.appendChild(t),
                this._imgList.push(t)
            }
            this._currentImg = 0,
            this._imgIn.style.width = this._width * this._data.detail_img.length + "px";
            var i = "";
            i += "<p class='detail-item'><span class='detail-stitle'>TITLE</span><br>",
            i += this._data.title + "</p>",
            i += "<p class='detail-item'><span class='detail-stitle'>CLIENT</span><br>",
            i += this._data.client + "</p>",
            (0 < this._data.member.length || 0 < this._data.related.length) && (i += "<p class='detail-item'><span class='detail-stitle'>MEMBER</span><br>");
            for (var e = !1, s = 0; s < this._data.member.length; s++)
                s <= 0 ? (i += this._data.member[s].name_jp,
                e = !0) : i += " / " + this._data.member[s].name_jp;
            for (s = 0; s < this._data.related.length; s++)
                e ? i += " / " + this._data.related[s] : (i += this._data.related[s],
                e = !0);
            i += "</p>",
            this._ex.innerHTML = i;
            var h = "";
            for (s = 0; s < this._data.detail_img.length; s++)
                h += 0 === s ? "<span class='detail-point-diact' style='opacity:1'>" : "<span class='detail-point-diact'>",
                h += "<a href='javascript:void(0)' onClick='_main._works._detail.slideImg(" + s + ")'>",
                h += "<img src='assets/image/works_detail_point.png' />",
                h += "</a>",
                h += "</span>";
            for (this._point.innerHTML = h,
            s = 0; s < this._data.member.length; s++) {
                var a = {};
                a.parent = this,
                a.type = "detail",
                a.stage = this._related,
                a.data = this._data.member[s],
                a.num = s;
                a = new MemberCaset(a);
                this._relatedList.push(a)
            }
            this._stage.style.opacity = 1;
            var o = this;
            $(this._stage).transition({
                width: this._stageW + "px"
            }, 400, "easeOutCubic", function() {
                o.isOpen = !0,
                "PC" !== _main._device && o.autoSlide()
            }),
            $(this._img).css({
                x: "-50%"
            }).transition({
                x: 0
            }, 400, "easeOutCubic"),
            _main._ring.removeLoading()
        } else
            this.loadImgStart()
    }
    ,
    t.prototype.autoSlide = function() {
        _main.removeEnterFrame(this),
        _main.addEnterFrame(this, "autoSlideFrame")
    }
    ,
    t.prototype.autoSlideFrame = function() {
        this._autoCount++,
        240 <= this._autoCount && (this._autoCount = 0,
        this._autoCurrent++,
        this._autoCurrent >= this._imgList.length && (this._autoCurrent = 0),
        this.slideImg(this._autoCurrent))
    }
    ,
    t.prototype.slideImg = function(t) {
        var i = $(this._point).children("span");
        if (!(i.length <= 0 || 1 <= i[t].style.opacity)) {
            var e = this._imgList[this._currentImg];
            $(e).transition({
                scale: .6,
                opacity: 0,
                zIndex: 0
            }, 500, "easeOutCubic", function() {
                $(e).css({
                    display: "none"
                })
            }),
            this._currentImg = t;
            var s = this._imgList[this._currentImg];
            $(s).css({
                display: "block",
                scale: 1.5,
                opacity: 0,
                zIndex: 1
            }).delay(50).transition({
                scale: 1,
                opacity: 1
            }, 500, "easeOutCubic");
            for (var h = 0; h < i.length; h++)
                h === t ? $(i[h]).animate({
                    opacity: 1
                }, 200) : $(i[h]).animate({
                    opacity: .5
                }, 200)
        }
    }
    ,
    t.prototype.closeDetail = function() {
        "PC" !== _main._device && (_main.removeEnterFrame(this),
        this._autoCount = 0,
        this._autoCurrent = 0);
        var t = this;
        $(this._stage).transition({
            width: "1px"
        }, 450, "easeInOutCubic", function() {
            t.closeComp()
        })
    }
    ,
    t.prototype.closeComp = function() {
        this.isOpen = !1,
        this._stage.style.opacity = 0,
        this._stage.style.display = "none";
        var i = this;
        $(this._bg).transition({
            opacity: 0
        }, 300, "easeOutCubic", function() {
            var t;
            for (i._bg.style.opacity = 0,
            i._bg.style.display = "none",
            t = 0; t < i._relatedList.length; t++)
                i._relatedList[t].clear();
            for (i._relatedList = [],
            t = 0; t < i._imgList.length; t++)
                i._imgIn.removeChild(i._imgList[t]);
            i._imgList = []
        })
    }
    ,
    t.prototype.allClear = function() {
        if (this.isOpen) {
            this.isOpen = !1,
            this._stage.style.opacity = 0,
            this._stage.style.display = "none",
            this._bg.style.opacity = 0,
            this._bg.style.display = "none";
            for (var t = 0; t < this._relatedList.length; t++)
                this._relatedList[t].clear();
            for (this._relatedList = [],
            t = 0; t < this._imgList.length; t++)
                this._imgIn.removeChild(this._imgList[t]);
            this._imgList = []
        }
    }
    ,
    t.prototype.gotoMember = function(t) {
        this.closeDetail(),
        _main._member.addDetailFromWorks(t)
    }
    ,
    t.prototype.onResize = function() {
        var t;
        if (this._width = this._parent._width,
        this._height = this._parent._height,
        this._parm && (this._top = $(this._parm.target).offset().top,
        "PC" !== _main._device && (t = $(this._parent._stage).offset().top + $(this._parent._stage).height(),
        this._top >= t - this._height - 10 && (this._top -= 2 * this._height)),
        this._stage.style.top = this._top + "px"),
        "PC" === _main._device) {
            for (this._stageW = 3 * this._width,
            this.isOpen && (this._stage.style.width = this._stageW + "px"),
            this._stage.style.height = 3 * this._height + "px",
            this._stage.style.left = "50%",
            this._stage.style.marginLeft = -3 * this._width * .5 + "px",
            this._bgW = $(this._parent._stage).width(),
            this._bgH = $(this._parent._stage).height(),
            this._bgT = $(this._parent._stage).offset().top,
            this._bg.style.width = this._bgW + "px",
            this._bg.style.height = this._bgH + 120 + "px",
            this._bg.style.top = this._bgT + "px",
            this._bg.style.left = "50%",
            this._bg.style.marginLeft = .5 * -this._bgW + "px",
            this._imgCo.style.position = "absolute",
            this._imgCo.style.width = "100%",
            this._imgCo.style.height = "100%",
            this._imgCo.style.opacity = 0,
            this._imgCo.style.zIndex = 100,
            this._imgIn.style.position = "absolute",
            this._img.style.position = "absolute",
            this._img.style.width = 2 * this._width + "px",
            this._img.style.height = 2 * this._height + "px",
            this._img.style.overflow = "hidden",
            this._img.style.lineHeight = 0,
            this._img.style.backgroundColor = "#121212",
            s = 0; s < this._imgList.length; s++) {
                this._imgList[s].style.width = 2 * this._width + "px",
                this._imgList[s].style.height = 2 * this._height + "px";
                for (var i = $(this._imgList[s]).children("img"), e = 0; e < i.length; e++)
                    i[e].style.width = 2 * this._width + "px",
                    i[e].style.height = 2 * this._height + "px"
            }
            this._txt.style.position = "absolute",
            this._txt.style.left = 2 * this._width + "px",
            this._txt.style.width = this._width + "px",
            this._txt.style.height = 2 * this._height + "px",
            this._txt.style.backgroundColor = "#000000",
            this._related.style.position = "absolute",
            this._related.style.width = 3 * this._width + "px",
            this._related.style.top = 2 * this._height + "px"
        } else {
            for (this._stageW = 2 * this._width,
            this.isOpen && (this._stage.style.width = this._stageW + "px"),
            this._stage.style.height = 5 * this._height + "px",
            this._stage.style.left = "50%",
            this._stage.style.marginLeft = -2 * this._width * .5 + "px",
            this._bgW = $(this._parent._stage).width(),
            this._bgH = $(this._parent._stage).height(),
            this._bgT = $(this._parent._stage).offset().top,
            this._bg.style.width = this._bgW + "px",
            this._bg.style.height = this._bgH + 120 + "px",
            this._bg.style.top = this._bgT + "px",
            this._bg.style.left = "50%",
            this._bg.style.marginLeft = .5 * -this._bgW + "px",
            this._imgCo.style.position = "absolute",
            this._imgCo.style.width = "100%",
            this._imgCo.style.height = "100%",
            this._imgCo.style.opacity = 0,
            this._imgCo.style.zIndex = 100,
            this._imgIn.style.position = "absolute",
            this._img.style.position = "absolute",
            this._img.style.width = 2 * this._width + "px",
            this._img.style.height = 2 * this._height + "px",
            this._img.style.overflow = "hidden",
            this._img.style.lineHeight = 0,
            this._img.style.backgroundColor = "#121212",
            s = 0; s < this._imgList.length; s++) {
                this._imgList[s].style.width = 2 * this._width + "px",
                this._imgList[s].style.height = 2 * this._height + "px";
                for (i = $(this._imgList[s]).children("img"),
                e = 0; e < i.length; e++)
                    i[e].style.width = 2 * this._width + "px",
                    i[e].style.height = 2 * this._height + "px"
            }
            this._txt.style.position = "absolute",
            this._txt.style.left = 0,
            this._txt.style.width = 2 * this._width + "px",
            "SP" === _main._device ? this._txt.style.height = 2 * this._height + "px" : this._txt.style.height = +this._height + "px",
            this._txt.style.top = 2 * this._height + "px",
            this._txt.style.backgroundColor = "#000000",
            this._related.style.position = "absolute",
            this._related.style.width = 2 * this._width + "px",
            "SP" === _main._device ? this._related.style.top = 4 * this._height + "px" : this._related.style.top = 3 * this._height + "px",
            this._close.style.top = 2 * -this._height + "px",
            this._close.style.left = 2 * this._width - 37 + "px"
        }
        for (var s = 0; s < this._relatedList.length; s++)
            this._relatedList[s].onResize()
    }
    ,
    t
}()
  , WorksPulldown = function() {
    function t(t) {
        this._parent = t,
        this._bcY = new Beacon,
        this._bcG = new Beacon,
        this._currentFilter = "all",
        this._currentValue = "",
        this.init()
    }
    return t.prototype.init = function() {
        var t, i, e, s, h;
        this._countY = 0,
        this._countG = 0;
        var a = this;
        for (this._sortIdList = [],
        this._sortElements = [],
        this._stage = document.getElementById("works"),
        this._sort_all = document.getElementById("sort-all"),
        this._sort_year = document.getElementById("sort-year"),
        this._sort_genre = document.getElementById("sort-genre"),
        this._data = _main._api.getWorksMenu(),
        this._sort_all.style.opacity = .4,
        this._sort_all.style.cursor = "default",
        this._sort_year.addEventListener("mouseover", function() {
            a.show("year")
        }, !1),
        this._sort_genre.addEventListener("mouseover", function() {
            a.show("genre")
        }, !1),
        this._sort_all.addEventListener("click", function() {
            1 <= a._sort_all.style.opacity && a.setFilter("all", "")
        }, !1),
        this._year = document.createElement("div"),
        this._year.style.position = "absolute",
        this._year.style.width = "122px",
        this._year.style.paddingTop = "10px",
        this._year.style.paddingBottom = "10px",
        this._year.style.backgroundColor = "#ffffff",
        this._year.style.color = "#000000",
        this._year.style.display = "none",
        i = "",
        t = 0; t < this._data.year.length; t++)
            i += "<p class='pulldown'>",
            i += "<span class='pulldown-sp' id=\"" + (e = String("s_" + this._data.year[t])) + '" onclick=\'_main._works._pulldown.setFilter("year","' + this._data.year[t] + "\");'>",
            i += this._data.year[t] + "</span></p>",
            this._sortIdList.push(e);
        for (this._year.innerHTML = i,
        s = $(this._sort_year).offset().top,
        h = $(this._stage).offset().left,
        this._year.style.top = s + 26 + "px",
        1700 <= window.parent.screen.width ? this._year.style.left = h + 244 + "px" : this._year.style.left = h + 194 + "px",
        document.body.appendChild(this._year),
        this._genre = document.createElement("div"),
        this._genre.style.position = "absolute",
        this._genre.style.width = "122px",
        this._genre.style.paddingTop = "10px",
        this._genre.style.paddingBottom = "10px",
        this._genre.style.backgroundColor = "#ffffff",
        this._genre.style.color = "#000000",
        this._genre.style.display = "none",
        i = "",
        t = 0; t < this._data.genre.length; t++)
            i += "<p class='pulldown'>",
            i += "<span class='pulldown-sp' id=\"" + (e = String("s_" + this._data.genre[t])) + '" onclick=\'_main._works._pulldown.setFilter("genre","' + this._data.genre[t] + "\");'>",
            i += this._data.genre[t].toUpperCase() + "</span></p>",
            this._sortIdList.push(e);
        for (this._genre.innerHTML = i,
        s = $(this._sort_genre).offset().top,
        h = $(this._stage).offset().left,
        this._genre.style.top = s + 26 + "px",
        1700 <= window.parent.screen.width ? this._genre.style.left = h + 380 + "px" : this._genre.style.left = h + 330 + "px",
        document.body.appendChild(this._genre),
        t = 0; t < this._sortIdList.length; t++)
            this._sortElements.push(document.getElementById(this._sortIdList[t]))
    }
    ,
    t.prototype.show = function(t) {
        for (var i, e, s = 0; s < this._sortElements.length; s++)
            this._sortElements[s].id === String("s_" + this._currentValue) ? ($(this._sortElements[s]).removeClass("pulldown-sp"),
            $(this._sortElements[s]).removeClass("pulldown-sp-n"),
            $(this._sortElements[s]).addClass("pulldown-sp-n")) : ($(this._sortElements[s]).removeClass("pulldown-sp"),
            $(this._sortElements[s]).removeClass("pulldown-sp-n"),
            $(this._sortElements[s]).addClass("pulldown-sp"));
        "year" === t ? (this._bcY.clear(),
        this._countY = 0,
        i = $(this._sort_year).offset().top,
        e = $(this._stage).offset().left,
        this._year.style.top = i + 26 + "px",
        1700 <= window.parent.screen.width ? this._year.style.left = e + 244 + "px" : this._year.style.left = e + 194 + "px",
        this._year.style.display = "block",
        this._year.style.opacity = 1,
        this._bcY.set(this, "checkFrameY")) : "genre" === t && (this._bcG.clear(),
        this._countG = 0,
        i = $(this._sort_genre).offset().top,
        e = $(this._stage).offset().left,
        this._genre.style.top = i + 26 + "px",
        1700 <= window.parent.screen.width ? this._genre.style.left = e + 380 + "px" : this._genre.style.left = e + 330 + "px",
        this._genre.style.display = "block",
        this._genre.style.opacity = 1,
        this._bcG.set(this, "checkFrameG"))
    }
    ,
    t.prototype.checkFrameY = function() {
        var t, i, e, s;
        this._countY++,
        this._countY < 10 || (this._countY = 10,
        t = $(this._year).offset().top,
        i = $(this._year).offset().left,
        e = $(this._year).height() + t,
        s = $(this._year).width() + i,
        (_main._world._originX < i || _main._world._originX > s || _main._world._originY < t - 24 || _main._world._originY > e) && (this._bcY.clear(),
        this._year.style.display = "none"))
    }
    ,
    t.prototype.checkFrameG = function() {
        var t, i, e, s;
        this._countG++,
        this._countG < 10 || (this._countG = 10,
        t = $(this._genre).offset().top,
        i = $(this._genre).offset().left,
        e = $(this._genre).height() + t,
        s = $(this._genre).width() + i,
        (_main._world._originX < i || _main._world._originX > s || _main._world._originY < t - 24 || _main._world._originY > e) && (this._bcG.clear(),
        this._genre.style.display = "none"))
    }
    ,
    t.prototype.setFilter = function(t, i) {
        this._currentValue !== i && (this._currentFilter = t,
        this._currentValue = i,
        "all" === this._currentFilter ? ($(this._sort_all).animate({
            opacity: .4
        }, 200),
        this._sort_all.style.cursor = "default") : ($(this._sort_all).animate({
            opacity: 1
        }, 200),
        this._sort_all.style.cursor = "pointer"),
        this._bcG.clear(),
        this._genre.style.display = "none",
        this._countG = 0,
        this._bcY.clear(),
        this._year.style.display = "none",
        this._countY = 0,
        _main._works.setFilter(t, i))
    }
    ,
    t
}()
  , WorksSet = function() {
    "use strict";
    function t() {
        this.init()
    }
    return t.prototype.init = function() {
        this.isStart = !1,
        this._imgList = [],
        this._loadNum = 0,
        this.isLoadEnd = !1,
        this.isEvent = !1,
        this._width = 1600,
        this._height = 900,
        this._works = document.getElementById("works"),
        this._stage = document.getElementById("works-list"),
        "PC" === _main._device ? this._pulldown = new WorksPulldown(this) : this._pulldown = new PulldownSP({
            type: "works",
            parent: this
        }),
        this._more = document.getElementById("works-more"),
        this._moreBorder = document.getElementById("works-more-border"),
        this.isMoreAnim = !1,
        this._detail = new WorksDetail(this);
        var t = {
            filter: "all",
            value: "",
            isFilter: !(this._casets = [])
        };
        this.createCaset(t)
    }
    ,
    t.prototype.createCaset = function(t) {
        var i;
        if (this.isStart = !1,
        this._imgList = [],
        this._loadNum = 0,
        this.isLoadEnd = !1,
        this._wList = [],
        this._casets = [],
        "all" === t.filter ? this._wList = _main._api.getWorksList() : this._wList = _main._api.getFilterResult("works", t.filter, t.value),
        this._wList.length <= 0)
            console.log("WORKS FILTER LENGTH 0");
        else {
            for (this._pageLimit = 21,
            this._pageNum = 0,
            this._pageMax = Math.ceil(this._wList.length / this._pageLimit),
            this._pageList = [],
            i = 0; i < this._pageMax; i++) {
                for (var e = [], s = 0; s < this._pageLimit; s++)
                    void 0 !== this._wList[s + i * this._pageLimit] && e.push(this._wList[s + i * this._pageLimit]);
                this._pageList.push(e)
            }
            this._pageMax <= 1 ? (this._more.style.cursor = "default",
            $(this._more).transition({
                opacity: .3
            })) : (this._more.style.cursor = "pointer",
            $(this._more).transition({
                opacity: 1
            })),
            removeResize(this),
            addResize(this),
            this.onResize(),
            this.createImg(t.isFilter)
        }
    }
    ,
    t.prototype.createImg = function(t) {
        var i, e = this._pageList[this._pageNum], s = Math.floor((e.length - 3) / 2);
        for (3 <= e.length ? i = [1, 1, 1] : 1 === e.length ? i = [1, 0, 0] : 2 === e.length && (i = [1, 1, 0]),
        o = 0; o < s; o++) {
            var h = o % 4;
            0 == h ? (i.push(1),
            i.push(1),
            i.push(0)) : 1 == h ? (i.push(0),
            i.push(1),
            i.push(1)) : 2 == h ? (i.push(1),
            i.push(1),
            i.push(0)) : (i.push(1),
            i.push(0),
            i.push(1))
        }
        for (var a = 0, o = 0; o < i.length; o++)
            1 === i[o] && a++;
        var n = e.length - a;
        for (o = 0; o < n; o++)
            i.push(1);
        var _ = 0;
        for (o = 0; o < i.length; o++) {
            var r, l = {};
            1 === i[o] ? (l.parent = this,
            l.type = "list",
            l.stage = document.getElementById("works-list"),
            l.data = e[_],
            l.num = o,
            r = new WorksCaset(l),
            this._imgList.push(r),
            _++) : (l.parent = this,
            l.type = "list",
            l.stage = document.getElementById("works-list"),
            l.data = null,
            l.num = o,
            r = new WorksCaset(l)),
            this._casets.push(r)
        }
        t && (onResize(),
        this.isStart = !1,
        this.start())
    }
    ,
    t.prototype.start = function() {
        var t;
        this.isStart || (this.isStart = !0,
        this.isEvent || (this.isEvent = !0,
        (t = this)._more.addEventListener("click", function() {
            t.moreClick()
        }, !1),
        this._more.addEventListener("mouseover", function() {
            t.moreOver()
        }, !1)),
        this.loadImg())
    }
    ,
    t.prototype.loadImg = function() {
        _main._sceneMng.onResize(),
        this._imgList.length <= 0 || this._imgList[this._loadNum].loadImg()
    }
    ,
    t.prototype.loadImgComp = function() {
        this._loadNum++,
        this._loadNum >= this._imgList.length ? this.isLoadEnd = !0 : this.loadImg()
    }
    ,
    t.prototype.addDetail = function(t) {
        this._detail.addDetail(t)
    }
    ,
    t.prototype.addDetailFromMember = function(t) {
        this._detail.allClear();
        for (var i = {}, e = !1, s = 0; s < this._imgList.length; s++)
            if (this._imgList[s]._data.id === t) {
                e = !0,
                i.id = t,
                i.target = this._imgList[s]._effect,
                this.addDetail(i);
                break
            }
        e || (i.id = t,
        i.target = this._imgList[0]._effect,
        this.addDetail(i))
    }
    ,
    t.prototype.setFilter = function(t, i) {
        if (this._detail.allClear(),
        0 < this._casets.length)
            for (var e = 0; e < this._casets.length; e++)
                this._casets[e].clear();
        this._casets = [];
        var s = {};
        s.filter = t,
        s.value = i,
        s.isFilter = !0,
        this.createCaset(s),
        _main._sceneMng.pageSlide("works")
    }
    ,
    t.prototype.moreClick = function() {
        this._pageNum++,
        this._pageNum >= this._pageMax || (_main._member._detail.closeDetail(),
        this._detail.isOpen && this._detail.closeDetail(),
        this.createImg(),
        this.isLoadEnd && (this.isLoadEnd = !1,
        this.loadImg()),
        this._pageNum >= this._pageMax - 1 && (this._more.style.cursor = "default",
        $(this._more).transition({
            opacity: .3
        })))
    }
    ,
    t.prototype.moreOver = function() {
        var t;
        this._pageNum >= this._pageMax || this.isMoreAnim || (this.isMoreAnim = !0,
        t = this,
        $(this._moreBorder).transition({
            x: "100%"
        }, 250, "linear", function() {
            $(t._moreBorder).css({
                x: "-100%"
            }),
            t.moreOver2()
        }))
    }
    ,
    t.prototype.moreOver2 = function() {
        var t = this;
        $(this._moreBorder).delay(50).transition({
            x: 0
        }, 250, "easeOutCubic", function() {
            t.isMoreAnim = !1
        })
    }
    ,
    t.prototype.onResize = function() {
        var t = $(window).width();
        "PC" !== _main._device ? (this._width = Math.floor(.5 * (t - 40)),
        this._height = Math.floor(this._width / 16 * 9),
        this._works.style.width = t - 40 + "px") : t > _main._conf._borderW ? (this._width = 436,
        this._height = 245,
        this._works.style.width = "1308px") : (this._width = 368,
        this._height = 207,
        this._works.style.width = "1104px");
        for (var i = 0; i < this._casets.length; i++)
            this._casets[i].onResize();
        this._detail && this._detail.onResize()
    }
    ,
    t
}()
  , AboutSet = function() {
    "use strict";
    function t() {
        this._width = 1600,
        this._height = 900,
        this._about = document.getElementById("about"),
        this._aboutTxt = document.getElementById("about-txt"),
        this.init()
    }
    return t.prototype.init = function() {
        var t = document.getElementById("about-left")
          , i = document.getElementById("about-right")
          , e = $($.parseHTML(_main._parts.getHtml(_main._conf._jsonFileAbout)));
        if (t.innerHTML = e.filter("#out-about-left")[0].innerHTML,
        i.innerHTML = e.filter("#out-about-right")[0].innerHTML,
        "PC" !== _main._device) {
            for (var s = $(this._about).find(".about-link"), h = 0; h < s.length; h++)
                s[h].style.width = "68px",
                s[h].style.height = "auto";
            $("#p-mark").css({
                width: "74px",
                height: "74px"
            })
        }
        addResize(this),
        this.onResize()
    }
    ,
    t.prototype.onResize = function() {
        var t = $(window).width();
        "PC" !== _main._device ? (this._about.style.width = t - 40 + "px",
        "TB" === _main._device && (this._aboutTxt.style.marginTop = "600px")) : (_main._conf._borderW,
        this._about.style.width = "1098px")
    }
    ,
    t
}()
  , APIMng = function() {
    "use strict";
    function t() {
        this.isCheckWorks = !1,
        this.isCheckMember = !1,
        this.init()
    }
    return t.prototype.init = function() {}
    ,
    t.prototype.setJson = function() {
        var t, i;
        for (this._works = _main._jsonMng.getJson(_main._conf._jsonFile).works.entries,
        this._member = _main._jsonMng.getJson(_main._conf._jsonFile).member.entries,
        this.isCheckMember = !0,
        t = 0; t < this._works.length; t++) {
            for (var e = [], s = 0; s < this._works[t].member.length; s++)
                for (i = 0; i < this._member.length; i++)
                    if (String(this._works[t].member[s]) === String(this._member[i].id)) {
                        e.push(this._member[i]);
                        break
                    }
            this._works[t].member = e
        }
        for (t = 0; t < this._member.length; t++) {
            e = [];
            for (s = 0; s < this._member[t].works.length; s++)
                for (i = 0; i < this._works.length; i++)
                    if (String(this._member[t].works[s]) === String(this._works[i].id)) {
                        e.push(this._works[i]);
                        break
                    }
            this._member[t].works = e
        }
        _main.loadCheckJSON()
    }
    ,
    t.prototype.getWorksList = function() {
        return this._works
    }
    ,
    t.prototype.getMemberList = function() {
        return this._member
    }
    ,
    t.prototype.getWorksDetail = function(t) {
        for (var i = {}, e = 0; e < this._works.length; e++)
            if (t === this._works[e].id) {
                i = this._works[e];
                break
            }
        _main._works._detail.setWorksData(i)
    }
    ,
    t.prototype.getWorksMenu = function() {
        return _main._jsonMng.getJson(_main._conf._jsonFile).works.menu
    }
    ,
    t.prototype.getMemberMenu = function() {
        for (var t, i = _main._jsonMng.getJson(_main._conf._jsonFile).member.menu.category, e = [], s = [], h = 0; h < i.length; h++)
            -1 !== i[h].toUpperCase().indexOf("PRODUCER") && i[h].length > String("PRODUCER").length || -1 === i[h].indexOf("CHIEF PRODUCTION MANAGER") && e.push(i[h]);
        for (h = 0; h < e.length; h++)
            "PRODUCER" !== e[h].toUpperCase() ? s.push(e[h]) : t = e[h];
        return s.unshift(t),
        {
            category: s
        }
    }
    ,
    t.prototype.getMemberDetail = function(t) {
        for (var i = {}, e = 0; e < this._member.length; e++)
            if (t === this._member[e].id) {
                i = this._member[e];
                break
            }
        _main._member._detail.setMemberData(i)
    }
    ,
    t.prototype.getFilterResult = function(t, i, e) {
        var s, h, a = [];
        if ("works" === t)
            for (h = this._works,
            s = 0; s < h.length; s++)
                "year" === i ? String(h[s].year) === String(e) && a.push(h[s]) : "genre" === i && String(h[s].genre) === String(e) && a.push(h[s]);
        else if ("member" === t)
            for (h = this._member,
            s = 0; s < h.length; s++)
                "category" === i && ("PRODUCER" === String(e) ? -1 != String(h[s].job).indexOf("PRODUCER") && a.push(h[s]) : "PRODUCTION MANAGER" === String(e) ? -1 != String(h[s].job).indexOf("PRODUCTION MANAGER") && a.push(h[s]) : String(h[s].job) === String(e) && a.push(h[s]));
        return a
    }
    ,
    t
}()
  , Beacon = function() {
    function t() {
        this._trg,
        this._funcName = ""
    }
    return t.prototype.set = function(t, i) {
        null != this._trg && null != this._trg || (this._trg = t,
        this._funcName = i,
        _main.addEnterFrame(this, "onEnterFrame"))
    }
    ,
    t.prototype.onEnterFrame = function() {
        this._trg[this._funcName]()
    }
    ,
    t.prototype.clear = function() {
        null != this._trg && null != this._trg && (_main.removeEnterFrame(this),
        this._trg = null,
        this._funcName = "")
    }
    ,
    t
}()
  , BgCard = function() {
    "use strict";
    function t(t) {
        this._parm = t,
        this._id = t.id,
        this._parent = t.parent,
        this._path = t.path,
        this._cWidth = this._parent._cWidth,
        this._cHeight = this._parent._cHeight,
        this._iColumn = this._parent._iColumn,
        this._iLine = this._parent._iLine,
        this._baseX = 0,
        this._baseY = 0,
        this._baseZ = 0,
        this._bc = new Beacon,
        this._speedY = 0,
        this._speedYMax = 0,
        this._speedX = .5,
        this._alpha = 1,
        this._changeCount = 0,
        this._changeCountMax = 2 * Math.ceil(30 * Math.random()),
        this.isShowComp = !1,
        this.isComp = !1,
        this.init()
    }
    return t.prototype.init = function() {
        var t = new THREE.PlaneGeometry(this._cWidth,this._cHeight,1,1)
          , i = new THREE.MeshBasicMaterial({
            color: 0,
            transparent: !0
        });
        this._black = new THREE.Mesh(t,i),
        this._lineNum = Math.floor(this._id / this._iColumn);
        t = this._id % this._iColumn * this._cWidth,
        i = -this._lineNum * this._cHeight;
        this._geo = new THREE.PlaneBufferGeometry(this._cWidth,this._cHeight,2,2),
        this._shader = {
            vertexShader: _main._parts.getShader("assets/shader/bg_caset_vtx.js"),
            fragmentShader: _main._parts.getShader("assets/shader/bg_caset_frg.js"),
            uniforms: {
                texture: {
                    value: _main._parts.getTex(this._path)
                },
                alpha: {
                    value: this._alpha
                }
            },
            transparent: !0,
            side: THREE.DoubleSide,
            depthTest: !1
        },
        this._mat = new THREE.ShaderMaterial(this._shader),
        this._mesh = new THREE.Mesh(this._geo,this._mat),
        this._baseX = this._mesh.position.x = t - this._iColumn * this._cWidth * .5 + .5 * this._cWidth,
        this._baseY = this._mesh.position.y = i + this._iLine * this._cHeight * .5 - .5 * this._cHeight,
        this._mesh.position.z = this._baseZ,
        this._maxX = this._iColumn * (Math.floor(this._cWidth / 2) + 1),
        this._minX = -(this._iColumn * (Math.floor(this._cWidth / 2) + 1)),
        this._parent._group.add(this._mesh),
        this._black.position.x = this._mesh.position.x,
        this._black.position.y = this._mesh.position.y,
        this._black.position.z = this._mesh.position.z + 1,
        this._parent._group.add(this._black)
    }
    ,
    t.prototype.reset = function(t) {
        this._shader.uniforms.texture.value = _main._parts.getTex(t),
        this._mesh.position.x = this._baseX,
        this._mesh.position.y = this._baseY,
        this._mesh.position.z = this._baseZ,
        this._mesh.rotation.x = 0,
        this._mesh.rotation.y = 0,
        this._mesh.rotation.z = 0,
        this._black.position.x = this._mesh.position.x,
        this._black.position.y = this._mesh.position.y,
        this._black.position.z = this._mesh.position.z + 1,
        this._black.geometry.vertices[0].x = .5 * -this._cWidth,
        this._black.geometry.vertices[2].x = .5 * -this._cWidth,
        this._black.geometry.verticesNeedUpdate = !0,
        this._black.parent || this._parent._group.add(this._black)
    }
    ,
    t.prototype.startWaitCount = function() {
        this._startWait = 4 * Math.floor(30 * Math.random()),
        this._startWaitCount = 0,
        this._bc.clear(),
        this._bc.set(this, "startWaitFrame")
    }
    ,
    t.prototype.startWaitFrame = function() {
        this._startWaitCount++,
        this._startWaitCount >= this._startWait && (this._startWaitCount = 0,
        this._bc.clear(),
        this._bc.set(this, "startWaitFrame2"))
    }
    ,
    t.prototype.startWaitFrame2 = function() {
        this._black.geometry.vertices[0].x = .85 * this._black.geometry.vertices[0].x + .15 * this._black.geometry.vertices[1].x,
        this._black.geometry.vertices[2].x = .95 * this._black.geometry.vertices[2].x + .05 * this._black.geometry.vertices[3].x,
        this._black.geometry.verticesNeedUpdate = !0,
        Math.abs(this._black.geometry.vertices[2].x - this._black.geometry.vertices[3].x) < .2 && (this.isShowComp = !0,
        this._bc.clear(),
        this._parent._group.remove(this._black),
        this._parent.checkStatus())
    }
    ,
    t.prototype.topFrame = function() {
        var t;
        this._lineNum % 2 == 0 ? (this._mesh.position.x += .5,
        this._mesh.position.x >= this._maxX && (t = this._parent._lineTotal[this._lineNum],
        this._mesh.position.x = t[0]._mesh.position.x - this._cWidth,
        this._parent.replaceList(this._lineNum, "right"))) : (this._mesh.position.x -= .5,
        this._mesh.position.x <= this._minX && (t = this._parent._lineTotal[this._lineNum],
        this._mesh.position.x = t[t.length - 1]._mesh.position.x + this._cWidth,
        this._parent.replaceList(this._lineNum, "left"))),
        this._black.parent && (this._black.position.x = this._mesh.position.x)
    }
    ,
    t.prototype.topFrame2 = function() {
        this._changeCount < this._changeCountMax ? (this._changeCount++,
        this._lineNum % 2 == 0 ? this._mesh.position.x += .5 : this._mesh.position.x -= .5) : this._black.parent || this._parent._group.add(this._black)
    }
    ,
    t.prototype.topBackFrame = function() {
        this._alpha = .88 * this._alpha + .12,
        this._shader.uniforms.alpha.value = this._alpha,
        this._mesh.position.x = .9 * this._mesh.position.x + .1 * this._baseX,
        this._mesh.position.y = .9 * this._mesh.position.y + .1 * this._baseY,
        this._mesh.position.z = .9 * this._mesh.position.z + .1 * this._baseZ,
        this._mesh.rotation.x = .9 * this._mesh.rotation.x + 0,
        this._mesh.rotation.y = .9 * this._mesh.rotation.y + 0,
        this._mesh.scale.x = .9 * this._mesh.scale.x + .1,
        this._mesh.scale.y = this._mesh.scale.x,
        Math.abs(this._mesh.position.x - this._baseX) < .5 && Math.abs(+this._mesh.position.z) < .5 && Math.abs(this._mesh.position.x - this._baseX) < .5 && Math.abs(this._mesh.scale.x - 1) < .02 && (this._mesh.position.x = this._baseX,
        this._mesh.position.y = this._baseY,
        this._mesh.position.z = this._baseZ,
        this._mesh.rotation.x = 0,
        this._mesh.rotation.y = 0,
        this._mesh.scale.x = 1,
        this._mesh.scale.y = 1,
        this.isComp || (this.isComp = !0,
        this._parent.topBackComp()))
    }
    ,
    t.prototype.underInit = function() {
        this._black.parent && this._parent._group.remove(this._black),
        this.isComp = !1,
        this.isShowComp = !0,
        this._speedYMax = 8 * Math.random() + 4,
        this._speedY = 0,
        this._rotationX = 0,
        this._rotationXMax = (1.8 * Math.random() - .9) * Math.PI / 180,
        this._rotationY = 0,
        this._rotationYMax = (1.8 * Math.random() - .9) * Math.PI / 180,
        this._trgZ = -(1e3 * Math.random() + 500),
        this._speedZ = 1,
        this._underWait = 0,
        this._underWaitMax = 0
    }
    ,
    t.prototype.underFrame = function() {
        this._underWait++,
        this._underWait < this._underWaitMax || (this._underWait = this._underWaitMax,
        this._speedY = .95 * this._speedY + .05 * this._speedYMax,
        this._mesh.position.y += this._speedY,
        2500 <= this._mesh.position.y && (this._mesh.position.y = -2500,
        this._trgZ = -(1600 * Math.random() + 1e3),
        this._mesh.position.x = 1e4 * Math.random() - 5e3,
        this._mesh.scale.x = this._mesh.scale.y = .4 * Math.random() + .3,
        this._speedYMax = 4 * Math.random() + 2,
        this._mesh.rotation.x = 30 * Math.random() - 15 * Math.PI / 180,
        this._mesh.rotation.y = 30 * Math.random() - 15 * Math.PI / 180,
        this._alpha = .72,
        this._shader.uniforms.alpha.value = this._alpha),
        this._rotationX = .98 * this._rotationX + .02 * this._rotationXMax,
        this._mesh.rotation.x += this._rotationX,
        this._mesh.rotation.x >= 2 * Math.PI && (this._mesh.rotation.x = 0),
        this._rotationY = .98 * this._rotationY + .02 * this._rotationYMax,
        this._mesh.rotation.y += this._rotationY,
        this._mesh.rotation.y >= 2 * Math.PI && (this._mesh.rotation.y = 0),
        this._speedY = .98 * this._speedY + .02 * this._speedYMax,
        this._mesh.position.y += this._speedY,
        this._speedZ = .98 * this._speedZ + .017,
        this._mesh.position.z = this._mesh.position.z * this._speedZ + this._trgZ * (1 - this._speedZ))
    }
    ,
    t
}()
  , BgCardL = function() {
    "use strict";
    function t(t) {
        this._parm = t,
        this._id = t.id,
        this._parent = t.parent,
        this._tex = t.tex,
        this._cWidth = this._parent._cWidth,
        this._cHeight = this._parent._cHeight,
        this._iColumn = this._parent._iColumn,
        this._iLine = this._parent._iLine,
        this._baseX = 0,
        this._baseY = 0,
        this._baseZ = 0,
        this._bc = new Beacon,
        this._speedY = 0,
        this._speedYMax = 0,
        this._speedX = .5,
        this._alpha = 1,
        this._changeCount = 0,
        this._changeCountMax = 2 * Math.ceil(20 * Math.random()),
        this.isShowComp = !1,
        this.init()
    }
    return t.prototype.init = function() {
        var t = new THREE.PlaneGeometry(this._cWidth,this._cHeight,1,1)
          , i = new THREE.MeshBasicMaterial({
            color: 0,
            transparent: !0
        });
        this._black = new THREE.Mesh(t,i),
        this._lineNum = Math.floor(this._id / this._iColumn);
        t = this._id % this._iColumn * this._cWidth,
        i = -this._lineNum * this._cHeight;
        this._geo = new THREE.PlaneBufferGeometry(this._cWidth,this._cHeight,2,2),
        this._shader = {
            vertexShader: _main._parts.getShader("assets/shader/bg_caset_l_vtx.js"),
            fragmentShader: _main._parts.getShader("assets/shader/bg_caset_l_frg.js"),
            uniforms: {
                texture: {
                    value: this._tex
                },
                alpha: {
                    value: this._alpha
                },
                uvx: {
                    value: this._id % this._iColumn
                },
                uvy: {
                    value: Math.floor(this._id / this._iColumn)
                }
            },
            transparent: !0,
            side: THREE.DoubleSide,
            depthTest: !1
        },
        this._mat = new THREE.ShaderMaterial(this._shader),
        this._mesh = new THREE.Mesh(this._geo,this._mat),
        this._baseX = this._mesh.position.x = t - this._iColumn * this._cWidth * .5 + .5 * this._cWidth,
        this._baseY = this._mesh.position.y = i + this._iLine * this._cHeight * .5 - .5 * this._cHeight,
        this._mesh.position.z = this._baseZ,
        this._maxX = this._iColumn * (Math.floor(this._cWidth / 2) + 1),
        this._minX = -(this._iColumn * (Math.floor(this._cWidth / 2) + 1)),
        this._parent._group.add(this._mesh),
        this._black.position.x = this._mesh.position.x,
        this._black.position.y = this._mesh.position.y,
        this._black.position.z = this._mesh.position.z + 1,
        this._parent._group.add(this._black)
    }
    ,
    t.prototype.reset = function() {
        this._mesh.position.x = this._baseX,
        this._mesh.position.y = this._baseY,
        this._mesh.position.z = this._baseZ,
        this._mesh.rotation.x = 0,
        this._mesh.rotation.y = 0,
        this._mesh.rotation.z = 0,
        this._black.position.x = this._mesh.position.x,
        this._black.position.y = this._mesh.position.y,
        this._black.position.z = this._mesh.position.z + 1,
        this._black.geometry.vertices[0].x = .5 * -this._cWidth,
        this._black.geometry.vertices[2].x = .5 * -this._cWidth,
        this._black.geometry.verticesNeedUpdate = !0,
        this._black.parent || this._parent._group.add(this._black)
    }
    ,
    t.prototype.startWaitCount = function() {
        this._startWait = 4 * Math.floor(30 * Math.random()),
        this._startWaitCount = 0,
        this._bc.clear(),
        this._bc.set(this, "startWaitFrame")
    }
    ,
    t.prototype.startWaitFrame = function() {
        this._startWaitCount++,
        this._startWaitCount >= this._startWait && (this._startWaitCount = 0,
        this._bc.clear(),
        this._bc.set(this, "startWaitFrame2"))
    }
    ,
    t.prototype.startWaitFrame2 = function() {
        this._black.geometry.vertices[0].x = .82 * this._black.geometry.vertices[0].x + .18 * this._black.geometry.vertices[1].x,
        this._black.geometry.vertices[2].x = .92 * this._black.geometry.vertices[2].x + .08 * this._black.geometry.vertices[3].x,
        this._black.geometry.verticesNeedUpdate = !0,
        Math.abs(this._black.geometry.vertices[2].x - this._black.geometry.vertices[3].x) < .4 && (this.isShowComp = !0,
        this._bc.clear(),
        this._parent._group.remove(this._black),
        this._parent.checkStatus())
    }
    ,
    t.prototype.topFrame = function() {}
    ,
    t.prototype.topFrame2 = function() {
        this._changeCount < this._changeCountMax ? this._changeCount++ : this._black.parent || this._parent._group.add(this._black)
    }
    ,
    t.prototype.topBackFrame = function() {
        this._alpha = .88 * this._alpha + .12,
        this._shader.uniforms.alpha.value = this._alpha,
        this._mesh.position.x = .9 * this._mesh.position.x + .1 * this._baseX,
        this._mesh.position.y = .9 * this._mesh.position.y + .1 * this._baseY,
        this._mesh.position.z = .9 * this._mesh.position.z + .1 * this._baseZ,
        this._mesh.rotation.x = .9 * this._mesh.rotation.x + 0,
        this._mesh.rotation.y = .9 * this._mesh.rotation.y + 0,
        this._mesh.scale.x = .9 * this._mesh.scale.x + .1,
        this._mesh.scale.y = this._mesh.scale.x,
        Math.abs(this._mesh.position.x - this._baseX) < .5 && Math.abs(+this._mesh.position.z) < .5 && Math.abs(this._mesh.position.x - this._baseX) < .5 && Math.abs(this._mesh.scale.x - 1) < .02 && (this._mesh.position.x = this._baseX,
        this._mesh.position.y = this._baseY,
        this._mesh.position.z = this._baseZ,
        this._mesh.rotation.x = 0,
        this._mesh.rotation.y = 0,
        this._mesh.scale.x = 1,
        this._mesh.scale.y = 1,
        this.isComp || (this.isComp = !0,
        this._parent.topBackComp()))
    }
    ,
    t.prototype.underInit = function() {
        this._black.parent && this._parent._group.remove(this._black),
        this.isComp = !0,
        this.isShowComp = !0,
        this._speedYMax = 8 * Math.random() + 4,
        this._speedY = 0,
        this._rotationX = 0,
        this._rotationXMax = (1.8 * Math.random() - .9) * Math.PI / 180,
        this._rotationY = 0,
        this._rotationYMax = (1.8 * Math.random() - .9) * Math.PI / 180,
        this._trgZ = -(1e3 * Math.random() + 500),
        this._speedZ = 1,
        this._underWait = 0,
        this._underWaitMax = 0
    }
    ,
    t.prototype.underFrame = function() {
        this._underWait++,
        this._underWait < this._underWaitMax || (this._underWait = this._underWaitMax,
        this._speedY = .95 * this._speedY + .05 * this._speedYMax,
        this._mesh.position.y += this._speedY,
        2500 <= this._mesh.position.y && (this._mesh.position.y = -2500,
        this._trgZ = -(1500 * Math.random() + 900),
        this._mesh.position.x = 8e3 * Math.random() - 4e3,
        this._mesh.scale.x = this._mesh.scale.y = .4 * Math.random() + .3,
        this._speedYMax = 4 * Math.random() + 2,
        this._mesh.rotation.x = 30 * Math.random() - 15 * Math.PI / 180,
        this._mesh.rotation.y = 30 * Math.random() - 15 * Math.PI / 180,
        this._alpha = .75,
        this._shader.uniforms.alpha.value = this._alpha),
        this._rotationX = .98 * this._rotationX + .02 * this._rotationXMax,
        this._mesh.rotation.x += this._rotationX,
        this._mesh.rotation.x >= 2 * Math.PI && (this._mesh.rotation.x = 0),
        this._rotationY = .98 * this._rotationY + .02 * this._rotationYMax,
        this._mesh.rotation.y += this._rotationY,
        this._mesh.rotation.y >= 2 * Math.PI && (this._mesh.rotation.y = 0),
        this._speedY = .98 * this._speedY + .02 * this._speedYMax,
        this._mesh.position.y += this._speedY,
        this._speedZ = .98 * this._speedZ + .017,
        this._mesh.position.z = this._mesh.position.z * this._speedZ + this._trgZ * (1 - this._speedZ))
    }
    ,
    t.prototype.changeTex = function(t) {
        this._shader.uniforms.texture.value = t
    }
    ,
    t
}()
  , BgCardSet = function() {
    "use strict";
    function t(t) {
        this._parent = t,
        this.init()
    }
    return t.prototype.init = function() {
        this._group = new THREE.Object3D,
        this._group.position.set(0, 0, 0),
        this._parent._parent._scene.add(this._group),
        this._wait = 0,
        this._waitMax = 60,
        this._checkNum = 0;
        var t = _main._jsonMng.getJson(_main._conf._jsonFile).top_image.entries.small;
        for (this._imgList = [],
        e = 0; e < t.length; e++)
            this._imgList.push(t[e]);
        for (this._cardList = [],
        this._cWidth = 604,
        this._cHeight = 340,
        this._iColumn = 7,
        this._iLine = 4,
        this._iTotal = this._iColumn * this._iLine,
        this._lineTotalStart = [],
        this._lineTotal = [],
        e = 0; e < this._iLine; e++)
            this._lineTotalStart.push(new Array),
            this._lineTotal.push(new Array);
        if (this._topBackNum = 0,
        this._imgList.length < this._iTotal)
            for (var i = this._iTotal - this._imgList.length, e = 0; e < i; e++)
                this._imgList.push(t[e]);
        for (e = 0; e < this._iTotal; e++) {
            var s = {};
            s.id = e,
            s.parent = this,
            s.path = this._imgList[e];
            s = new BgCard(s);
            this._lineTotalStart[Math.floor(e / this._iColumn)].push(s),
            this._lineTotal[Math.floor(e / this._iColumn)].push(s),
            this._cardList.push(s)
        }
    }
    ,
    t.prototype.contentsStart = function() {
        this._group.parent || this._parent._parent._scene.add(this._group),
        this._group.position.z = 0,
        this._imgList = this.shuffle(this._imgList);
        for (var t = 0; t < this._cardList.length; t++)
            this._cardList[t].reset(this._imgList[t]);
        _main.addEnterFrame(this, "waitFrame")
    }
    ,
    t.prototype.waitFrame = function() {
        if (this._wait++,
        this._wait >= this._waitMax) {
            for (var t = 0; t < this._iTotal; t++)
                this._cardList[t].startWaitCount();
            this._wait = 0,
            this._waitMax = 30,
            _main.removeEnterFrame(this),
            _main.addEnterFrame(this, "topFrame")
        }
    }
    ,
    t.prototype.topFrame = function() {
        var t;
        for (this._group.position.z = .995 * this._group.position.z - 1.25,
        t = 0; t < this._iTotal; t++)
            this._cardList[t].topFrame()
    }
    ,
    t.prototype.replaceList = function(t, i) {
        var e;
        "right" === i ? (e = this._lineTotal[t].pop(),
        this._lineTotal[t].unshift(e)) : "left" === i && (e = this._lineTotal[t].shift(),
        this._lineTotal[t].push(e))
    }
    ,
    t.prototype.hide = function() {
        _main.removeEnterFrame(this),
        this._group.parent && this._parent._parent._scene.remove(this._group)
    }
    ,
    t.prototype.checkStatus = function() {
        this._checkNum++,
        this._checkNum >= this._cardList.length && (this._checkNum = 0,
        "top" !== this._parent._mode && this.changeMode(this._parent._mode))
    }
    ,
    t.prototype.topBackFrame = function() {
        this._group.position.z = .995 * this._group.position.z - 1.25;
        for (var t = 0; t < this._iTotal; t++)
            this._cardList[t].topBackFrame()
    }
    ,
    t.prototype.topBackComp = function() {
        if (this._topBackNum++,
        this._topBackNum >= this._iTotal) {
            this._topBackNum = 0,
            this._lineTotal = [];
            for (var t = 0; t < this._lineTotalStart.length; t++) {
                this._lineTotal[t] = [];
                for (var i = 0; i < this._lineTotalStart[t].length; i++)
                    this._lineTotal[t][i] = this._lineTotalStart[t][i]
            }
            this._topCount = 0,
            _main.removeEnterFrame(this),
            _main.addEnterFrame(this, "topFrame")
        }
    }
    ,
    t.prototype.underFrame = function() {
        this._group.position.z = .995 * this._group.position.z - 1.25;
        for (var t = 0; t < this._iTotal; t++)
            this._cardList[t].underFrame()
    }
    ,
    t.prototype.changeMode = function(t) {
        var i;
        if (_main.removeEnterFrame(this),
        this._checkNum = 0,
        "top" === t)
            _main.addEnterFrame(this, "topBackFrame");
        else {
            for (i = 0; i < this._iTotal; i++)
                this._cardList[i].underInit();
            _main.addEnterFrame(this, "underFrame")
        }
    }
    ,
    t.prototype.shuffle = function(t) {
        for (var i, e, s = t.length; s; )
            e = Math.floor(Math.random() * s--),
            i = t[s],
            t[s] = t[e],
            t[e] = i;
        return t
    }
    ,
    t
}()
  , BgCardSetL = function() {
    "use strict";
    function t(t) {
        this._parent = t,
        this.init()
    }
    return t.prototype.init = function() {
        var t;
        for (this._imgList = _main._jsonMng.getJson(_main._conf._jsonFile).top_image.entries.large,
        this._imgCount = 0,
        this._group = new THREE.Object3D,
        this._group.position.set(0, 0, 0),
        this._group.scale.set(1.25, 1.25, 1.25),
        this._parent._parent._scene.add(this._group),
        this._wait = 0,
        this._waitMax = 30,
        this._checkNum = 0,
        this._cardList = [],
        this._cWidth = 400,
        this._cHeight = 225,
        this._iColumn = 4,
        this._iLine = 4,
        this._iTotal = this._iColumn * this._iLine,
        this._topBackNum = 0,
        this._currentTex = _main._parts.getTex("assets/image/empty.png"),
        t = 0; t < this._iTotal; t++) {
            var i = {};
            i.id = t,
            i.parent = this,
            i.tex = this._currentTex;
            i = new BgCardL(i);
            this._cardList.push(i)
        }
    }
    ,
    t.prototype.reset = function() {
        this._group.parent && this._parent._parent._scene.remove(this._group),
        _main.removeEnterFrame(this)
    }
    ,
    t.prototype.contentsStart = function() {
        this._group.parent || this._parent._parent._scene.add(this._group);
        for (var t = this._group.position.z = 0; t < this._cardList.length; t++)
            this._cardList[t].reset();
        _main.addEnterFrame(this, "waitFrame")
    }
    ,
    t.prototype.waitFrame = function() {
        if (this._wait++,
        this._wait >= this._waitMax) {
            for (var t = 0; t < this._iTotal; t++)
                this._cardList[t].startWaitCount();
            this._wait = 0,
            this._waitMax = 30,
            _main.removeEnterFrame(this),
            _main.addEnterFrame(this, "topFrame")
        }
    }
    ,
    t.prototype.topFrame = function() {
        var t;
        for (this._group.position.z = .995 * this._group.position.z - 1.25,
        t = 0; t < this._iTotal; t++)
            this._cardList[t].topFrame()
    }
    ,
    t.prototype.hide = function() {
        _main.removeEnterFrame(this),
        this._group.parent && this._parent._parent._scene.remove(this._group)
    }
    ,
    t.prototype.checkStatus = function() {
        this._checkNum++,
        this._checkNum >= this._cardList.length && (this._checkNum = 0,
        "top" !== this._parent._mode && this.changeMode(this._parent._mode))
    }
    ,
    t.prototype.topBackFrame = function() {
        this._group.position.z = .995 * this._group.position.z - 1.25;
        for (var t = 0; t < this._iTotal; t++)
            this._cardList[t].topBackFrame()
    }
    ,
    t.prototype.topBackComp = function() {
        this._topBackNum++,
        this._topBackNum >= this._iTotal && (this._topBackNum = 0,
        this._topCount = 0,
        _main.removeEnterFrame(this),
        _main.addEnterFrame(this, "topFrame"))
    }
    ,
    t.prototype.underFrame = function() {
        this._group.position.z = .995 * this._group.position.z - 1.25;
        for (var t = 0; t < this._iTotal; t++)
            this._cardList[t].underFrame()
    }
    ,
    t.prototype.changeMode = function(t) {
        var i;
        if (_main.removeEnterFrame(this),
        this._checkNum = 0,
        "top" === t)
            _main.addEnterFrame(this, "topBackFrame");
        else {
            for (i = 0; i < this._iTotal; i++)
                this._cardList[i].underInit();
            _main.addEnterFrame(this, "underFrame")
        }
    }
    ,
    t.prototype.changeImg = function() {
        var t = this._imgList[this._imgCount];
        this._imgCount++,
        this._imgCount >= this._imgList.length && (this._imgCount = 0);
        var i = this;
        (new THREE.TextureLoader).load(t, function(t) {
            i.loadTexComp(t)
        })
    }
    ,
    t.prototype.loadTexComp = function(t) {
        var i = this._currentTex;
        this._currentTex = t,
        this._currentTex.needsUpdate = !0,
        this._currentTex.minFilter = THREE.LinearFilter,
        this._currentTex.magFilter = THREE.LinearFilter;
        for (var e = 0; e < this._cardList.length; e++)
            this._cardList[e].changeTex(this._currentTex);
        this._parent.setupCardL(),
        i.dispose(),
        i = null
    }
    ,
    t
}()
  , BgSet = function() {
    "use strict";
    function t(t) {
        this._parent = t,
        this.init()
    }
    return t.prototype.init = function() {
        this._wait = 0,
        this._mode = "top",
        this._topStatus = 0,
        this._topCount = 0,
        this._topCountMax = 480,
        this._cardS = new BgCardSet(this),
        this._cardL = new BgCardSetL(this),
        this._cardSet = this._cardS,
        this._blackSet = new CardBlackSet(this),
        this._bc = new Beacon
    }
    ,
    t.prototype.contentsStart = function() {
        this._cardL.reset(),
        this._cardSet.contentsStart(),
        0 < _main._jsonMng.getJson(_main._conf._jsonFile).top_image.entries.large.length && _main.addEnterFrame(this, "timerFrame")
    }
    ,
    t.prototype.timerFrame = function() {
        "top" == this._mode && (this._topCount++,
        this._topCount >= this._topCountMax && (_main.removeEnterFrame(this),
        (this._topCount = 0) === this._topStatus ? this._cardL.changeImg() : 1 === this._topStatus && (this._topCountMax = 480,
        _main.addEnterFrame(this, "timerFrame"),
        this._topStatus = 0,
        this._blackSet.startCover())))
    }
    ,
    t.prototype.setupCardL = function() {
        this._topCountMax = 660,
        _main.removeEnterFrame(this),
        _main.addEnterFrame(this, "timerFrame"),
        this._topStatus = 1,
        this._blackSet.startCover()
    }
    ,
    t.prototype.changePattarn = function() {
        0 === this._topStatus ? (this._cardSet.hide(),
        this._blackSet.stopCover(),
        this._cardSet = this._cardS,
        this._cardSet.contentsStart()) : 1 === this._topStatus && (this._cardSet.hide(),
        this._blackSet.stopCover(),
        this._cardSet = this._cardL,
        this._cardSet.contentsStart())
    }
    ,
    t.prototype.changeMode = function(t) {
        "top" === t && (this._topCountMax = 300),
        this._topCount = 0,
        this._mode = t,
        this._cardSet.changeMode(t)
    }
    ,
    t
}()
  , CanvasWorld = function() {
    "use strict";
    function t() {
        this._id = "world",
        this._width = 0,
        this._height = 0,
        this._render = null,
        this._scene = null,
        this._root = null,
        this._dLight = null,
        this._ambLight = null,
        this._cam = null,
        this._fov = 45,
        this._far = 1e4,
        this._near = .1,
        this._scrollTop = 0,
        this._pageX = 0,
        this._pageY = 0,
        this._mouseX = 0,
        this._mouseY = 0,
        this._originX = 0,
        this._originY = 0,
        this._spShift = 110
    }
    return t.prototype.init = function() {
        this._canvas = document.getElementById(this._id),
        this._width = this._canvas.clientWidth,
        this._height = $(window).height(),
        this.setViewPort(),
        this._cam = new THREE.OrthographicCamera(this._viewPort.left,this._viewPort.right,this._viewPort.top,this._viewPort.bottom,this._viewPort.near,this._viewPort.far),
        this._cam.position.set(0, 0, 100),
        this._scene = new THREE.Scene,
        this._render = new THREE.WebGLRenderer({
            antialias: !1,
            alpha: !1
        }),
        this._render.setPixelRatio(1),
        this._render.setSize(this._width, this._height),
        this._canvas.appendChild(this._render.domElement),
        this._noise = new NoiseSet,
        this._dummy = new DummyScene,
        this._display = new DisplaySet,
        this._colorDisplay = new ColorDisplay,
        "PC" === _main._device ? this._map = new MapSet(this) : this._map = new MapSetSP(this),
        this._dotScreen = new DotScreen,
        this._lineSet = new LineSet,
        this._logos = new MapLogo,
        this._title = new TopTitle;
        var e = this;
        document.body.addEventListener("mousemove", function(t) {
            var i = $(window).scrollTop();
            e._originX = t.pageX,
            e._originY = t.pageY,
            e._pageX = t.pageX - .5 * $(window).width(),
            e._pageY = t.pageY - i - .5 * $(window).height()
        }),
        this.playAnimation()
    }
    ,
    t.prototype.playAnimation = function() {
        addResize(this),
        this.onResize(),
        this.onEnterFrame(),
        _main.addEnterFrame(this, "onEnterFrame");
        setTimeout(function() {
            _main.contentsStart()
        }, 400)
    }
    ,
    t.prototype.contentsStart = function() {
        this._map.contentsStart(),
        this._dummy.contentsStart()
    }
    ,
    t.prototype.changeMode = function(t) {
        this._dummy.changeMode(t)
    }
    ,
    t.prototype.onEnterFrame = function() {
        this._scrollTop = $(window).scrollTop(),
        this._mouseX = .92 * this._mouseX + .08 * this._pageX,
        this._mouseY = .92 * this._mouseY + .08 * this._pageY,
        this._render.render(this._scene, this._cam)
    }
    ,
    t.prototype.setViewPort = function() {
        this._viewPort = {};
        var t = this._width
          , i = this._height
          , t = t / i;
        this._viewPort = {
            viewSize: i,
            aspectRatio: t,
            left: -t * i / 2,
            right: t * i / 2,
            top: i / 2,
            bottom: -i / 2,
            near: 0,
            far: 1e4
        }
    }
    ,
    t.prototype.onResize = function() {
        this._width = this._canvas.clientWidth,
        this._height = $(window).height(),
        this.setViewPort(),
        this._cam.left = this._viewPort.left,
        this._cam.right = this._viewPort.right,
        this._cam.top = this._viewPort.top,
        this._cam.bottom = this._viewPort.bottom,
        this._cam.updateProjectionMatrix(),
        this._render.setSize(this._width, this._height)
    }
    ,
    t
}()
  , CardBlackSet = function() {
    "use strict";
    function t(t) {
        this._parent = t,
        this._list = [],
        this.init()
    }
    return t.prototype.init = function() {
        this._scaleList = [2.4, .4, 1.6, 2.6, 2],
        this._group = new THREE.Object3D,
        this._group.position.z = 3,
        this._geo = new THREE.PlaneGeometry(1600,100,1,1),
        this._geo.vertices[0].x = 0,
        this._geo.vertices[0].y = 0,
        this._geo.vertices[1].x = 1600,
        this._geo.vertices[1].y = 0,
        this._geo.vertices[2].x = 0,
        this._geo.vertices[2].y = -100,
        this._geo.vertices[3].x = 1600,
        this._geo.vertices[3].y = -100,
        this._geo.verticesNeedUpdate = !0,
        this._mat = new THREE.MeshBasicMaterial({
            color: 0,
            transparent: !0,
            depthTest: !1
        });
        for (var t = 0, i = 0; i < this._scaleList.length; i++) {
            var e = new THREE.Mesh(this._geo,this._mat);
            e.scale.x = .001,
            e.scale.y = this._scaleList[i] + .01,
            e.position.x = -800,
            t += 100 * this._scaleList[i],
            e.position.y = t - 450,
            this._group.add(e),
            this._list.push(e)
        }
        this.setParm()
    }
    ,
    t.prototype.setParm = function() {
        this._waitList = [],
        this._countList = [],
        this._compList = [];
        for (var t = 0; t < this._scaleList.length; t++) {
            var i = 8 * t;
            this._waitList.push(i),
            this._countList.push(0),
            this._compList.push(0),
            this._list[t].scale.x = .001
        }
        this._waitList = this.shuffle(this._waitList)
    }
    ,
    t.prototype.startCover = function() {
        this.setParm(),
        _main.removeEnterFrame(this),
        this._group.parent || this._parent._parent._scene.add(this._group),
        _main.addEnterFrame(this, "enterFrame")
    }
    ,
    t.prototype.enterFrame = function() {
        for (var t = 0, i = 0; i < this._scaleList.length; i++)
            this._countList[i] += 1,
            this._countList[i] >= this._waitList[i] && (this._countList[i] = this._waitList[i],
            this._list[i].scale.x = .78 * this._list[i].scale.x + .22,
            Math.abs(this._list[i].scale.x - 1) < .005 && (this._compList[i] = 1)),
            t += this._compList[i];
        t >= this._list.length && (_main.removeEnterFrame(this),
        this._parent.changePattarn())
    }
    ,
    t.prototype.stopCover = function() {
        _main.removeEnterFrame(this),
        this._group.parent && this._parent._parent._scene.remove(this._group)
    }
    ,
    t.prototype.shuffle = function(t) {
        for (var i, e, s = t.length; s; )
            e = Math.floor(Math.random() * s--),
            i = t[s],
            t[s] = t[e],
            t[e] = i;
        return t
    }
    ,
    t
}()
  , ColorDisplay = function() {
    "use strict";
    function t() {
        this._baseW = 1600,
        this._baseH = 900,
        this.init()
    }
    return t.prototype.init = function() {
        this._geo = new THREE.PlaneGeometry(1600,900,2,2),
        this._mat = new THREE.MeshBasicMaterial({
            map: _main._world._dummy._render.texture,
            transparent: !0,
            opacity: .7
        }),
        this._mesh = new THREE.Mesh(this._geo,this._mat),
        this._mesh.position.z = -2.5,
        _main._world._scene.add(this._mesh),
        addResize(this),
        this.onResize(),
        _main.addEnterFrame(this, "enterFrame")
    }
    ,
    t.prototype.enterFrame = function() {
        this._mesh.rotation.z = _main._world._display._mesh.rotation.z
    }
    ,
    t.prototype.onResize = function() {
        var t = window.innerWidth / this._baseW
          , i = window.innerHeight / this._baseH;
        i <= t ? this._mesh.scale.set(t, t, t) : this._mesh.scale.set(i, i, i)
    }
    ,
    t
}()
  , Config = function() {
    "use strict";
    function t() {
        -1 !== location.href.indexOf("localhost") ? (this._jsonFile = "assets/json/all.json",
        this._jsonFileAbout = "/assets/json/about.html",
        this._jsonFileRecruit = "/assets/json/recruit.html") : (this._jsonFile = "/news/api/all/",
        this._jsonFileAbout = "/news/about/",
        this._jsonFileRecruit = "/news/recruit/"),
        this._borderW = 1200,
        this._count = 0,
        this._oldTIme = 0,
        this._d = 1,
        this._oldTime = Date.now()
    }
    return t.prototype.enterFrame = function() {
        var t = Date.now()
          , i = (t - this._oldTime) / 1e3 / .016;
        3 <= i && (i = 3),
        this._nd = i,
        this._d = .8 * this._d + .2 * i,
        this.s1 = +this._d,
        this.s005 = .05 * this._d,
        this.s03 = .3 * this._d,
        this.s14 = 1.4 * this._d,
        this.s0020 = .02 * this._d,
        this.s0016 = .016 * this._d,
        this.s099a = 1 - .01 * this._d,
        this.s099b = 1 - this.s099a,
        this.s098a = 1 - .02 * this._d,
        this.s098b = 1 - this.s098a,
        this.s097a = 1 - .03 * this._d,
        this.s097b = 1 - this.s097a,
        this.s096a = 1 - .04 * this._d,
        this.s096b = 1 - this.s096a,
        this.s095a = 1 - .05 * this._d,
        this.s095b = 1 - this.s095a,
        this.s094a = 1 - .06 * this._d,
        this.s094b = 1 - this.s094a,
        this.s093a = 1 - .07 * this._d,
        this.s093b = 1 - this.s093a,
        this.s092a = 1 - .08 * this._d,
        this.s092b = 1 - this.s092a,
        this.s091a = 1 - .09 * this._d,
        this.s091b = 1 - this.s091a,
        this.s090a = 1 - .1 * this._d,
        this.s090b = 1 - this.s090a,
        this.s089a = 1 - .11 * this._d,
        this.s089b = 1 - this.s089a,
        this.s088a = 1 - .12 * this._d,
        this.s088b = 1 - this.s088a,
        this.s087a = 1 - .13 * this._d,
        this.s087b = 1 - this.s087a,
        this.s086a = 1 - .14 * this._d,
        this.s086b = 1 - this.s086a,
        this.s085a = 1 - .15 * this._d,
        this.s085b = 1 - this.s085a,
        this.s084a = 1 - .16 * this._d,
        this.s084b = 1 - this.s084a,
        this.s083a = 1 - .17 * this._d,
        this.s083b = 1 - this.s083a,
        this.s082a = 1 - .18 * this._d,
        this.s082b = 1 - this.s082a,
        this.s081a = 1 - .19 * this._d,
        this.s081b = 1 - this.s081a,
        this.s080a = 1 - .2 * this._d,
        this.s080b = 1 - this.s080a,
        this.s070a = 1 - .2 * this._d,
        this.s070b = 1 - this.s070a,
        this.s060a = 1 - .4 * this._d,
        this.s060b = 1 - this.s060a,
        this._oldTime = t
    }
    ,
    t
}()
  , DisplaySet = function() {
    "use strict";
    function t() {
        this._baseW = 1600,
        this._baseH = 900,
        this.init()
    }
    return t.prototype.init = function() {
        var t;
        this._width = this._baseW,
        this._height = this._baseH;
        var i, e, s, h, a = _main._parts.getModel("assets/json/model.json");
        for (p = 0; p < a.vertices.length; p++)
            h = p <= 0 ? (i = a.vertices[p].x,
            e = a.vertices[p].x,
            s = a.vertices[p].y,
            a.vertices[p].y) : (i = Math.min(i, a.vertices[p].x),
            e = Math.max(e, a.vertices[p].x),
            s = Math.min(s, a.vertices[p].y),
            Math.max(h, a.vertices[p].y));
        var o = Math.abs(i) + Math.abs(e)
          , n = this._baseW / o;
        for (p = 0; p < a.vertices.length; p++)
            a.vertices[p].x *= n,
            a.vertices[p].y *= n,
            a.vertices[p].z *= n;
        a.verticesNeedUpdate = !0,
        (new THREE.ExplodeModifier).modify(a);
        var _ = a.faces.length;
        this._geo = (new THREE.BufferGeometry).fromGeometry(a),
        this._geo.verticesNeedUpdate = !0,
        this._strength = 0,
        this._pageX = 0,
        this._pageY = 0,
        this._pageXold = 0,
        this._pageYold = 0,
        this._distance = 0,
        this._sinZ = 0;
        for (var r = new Float32Array(3 * _ * 3), l = 0; l < _; l++) {
            t = 9 * l;
            Math.random();
            for (var p = 0; p < 3; p++)
                1 === p ? (r[t + 3 * p] = 6 * Math.random() - 3,
                r[t + 3 * p + 1] = 6 * Math.random() - 3) : (r[t + 3 * p] = 3 * Math.random() - 1.5,
                r[t + 3 * p + 1] = 3 * Math.random() - 1.5),
                r[t + 3 * p + 2] = 1
        }
        this._geo.addAttribute("displacement", new THREE.BufferAttribute(r,3));
        var d = this._geo.attributes.position.array
          , m = new Float32Array(r.length);
        for (p = 0; p < _; p += 9) {
            t = 9 * p;
            for (var c = d[p], u = d[p + 1], g = d[p + 2], y = d[p + 3], f = d[p + 4], w = d[p + 5], v = (c + y + d[p + 6]) / 3, b = (u + f + d[p + 7]) / 3, E = (g + w + d[p + 8]) / 3, x = 0; x < 3; x++)
                m[t + 3 * x] = v,
                m[t + 3 * x + 1] = b,
                m[t + 3 * x + 2] = E
        }
        this._geo.addAttribute("centers", new THREE.BufferAttribute(m,3)),
        this._shader = {
            vertexShader: _main._parts.getShader("assets/shader/display_vtx.js"),
            fragmentShader: _main._parts.getShader("assets/shader/display_frg.js"),
            uniforms: {
                texture: {
                    value: _main._world._dummy._render.texture
                },
                texture2: {
                    value: _main._world._dummy._render.texture
                },
                mouseX: {
                    value: 0
                },
                mouseY: {
                    value: 0
                },
                strength: {
                    value: this._strength
                },
                range: {
                    value: 22
                }
            },
            transparent: !0,
            depthWrite: !1,
            depthTest: !1,
            wireframe: !1
        },
        this._mat = new THREE.ShaderMaterial(this._shader),
        this._mesh = new THREE.Mesh(this._geo,this._mat),
        this._mesh.position.z = -2,
        this._mesh.rotation.y = 0,
        _main._world._scene.add(this._mesh),
        addResize(this),
        this.onResize(),
        this._pageXold = this._pageX = _main._world._pageX,
        this._pageYold = this._pageY = _main._world._pageY,
        _main.addEnterFrame(this, "enterFrame")
    }
    ,
    t.prototype.enterFrame = function() {
        this._shader.uniforms.mouseX.value = _main._world._mouseX,
        this._shader.uniforms.mouseY.value = _main._world._mouseY,
        this._pageX = _main._world._pageX,
        this._pageY = _main._world._pageY;
        var t = this._pageXold - this._pageX
          , i = this._pageYold - this._pageY
          , i = Math.sqrt(t * t + i * i);
        this._strength = i < 4 ? .96 * this._strength + 0 : .9 * this._strength + .04 * i * .1,
        this._shader.uniforms.strength.value = this._strength,
        this._pageXold = this._pageX,
        this._pageYold = this._pageY
    }
    ,
    t.prototype.onResize = function() {
        var t = window.innerWidth / this._baseW
          , i = window.innerHeight / this._baseH;
        i <= t ? this._mesh.scale.set(t, t, t) : this._mesh.scale.set(i, i, i)
    }
    ,
    t
}()
  , DotScreen = function() {
    function t() {
        this.init()
    }
    return t.prototype.init = function() {
        var t = Math.ceil(32)
          , i = Math.ceil(32);
        this._geo = new THREE.PlaneGeometry(64 * t,64 * i,2,2);
        var e = _main._parts.getTex("assets/image/bd_dot.png");
        e.wrapS = e.wrapT = THREE.RepeatWrapping,
        e.repeat.set(t, i),
        this._mat = new THREE.MeshBasicMaterial({
            transparent: !0,
            map: e,
            opacity: .15
        }),
        this._mesh = new THREE.Mesh(this._geo,this._mat),
        this._mesh.position.z = 0,
        _main._world._scene.add(this._mesh)
    }
    ,
    t
}()
  , DummyScene = function() {
    "use strict";
    function t() {
        this.init()
    }
    return t.prototype.init = function() {
        this._fov = 45,
        this._far = 1e5,
        this._near = .1,
        this._width = 1600,
        this._height = 900,
        this._cam = new THREE.PerspectiveCamera(this._fov,this._width / this._height,this._near,this._far),
        this._cam.position.x = 0,
        this._cam.position.y = 0;
        var t = this._height / 2 / Math.tan(this._fov * Math.PI / 180 / 2);
        this._cam.position.set(0, 0, t),
        this._scene = new THREE.Scene,
        this._render = new THREE.WebGLRenderTarget(this._width,this._height,{
            magFilter: THREE.LinearFilter,
            minFilter: THREE.LinearFilter,
            wrapS: THREE.ClampToEdgeWrapping,
            wrapT: THREE.ClampToEdgeWrapping
        }),
        this._bg = new BgSet(this),
        _main.addEnterFrame(this, "enterFrame")
    }
    ,
    t.prototype.contentsStart = function() {
        this._bg.contentsStart()
    }
    ,
    t.prototype.changeMode = function(t) {
        this._bg.changeMode(t)
    }
    ,
    t.prototype.enterFrame = function() {
        _main._world._render.render(this._scene, this._cam, this._render)
    }
    ,
    t
}();
THREE.ExplodeModifier = function() {}
,
THREE.ExplodeModifier.prototype.modify = function(t) {
    for (var i = [], e = 0, s = t.faces.length; e < s; e++) {
        var h = i.length
          , a = t.faces[e]
          , o = a.a
          , n = a.b
          , _ = a.c
          , o = t.vertices[o]
          , n = t.vertices[n]
          , _ = t.vertices[_];
        i.push(o.clone()),
        i.push(n.clone()),
        i.push(_.clone()),
        a.a = h,
        a.b = h + 1,
        a.c = h + 2
    }
    t.vertices = i
}
;
var FooterSet = function() {
    "use strict";
    function t() {
        this._mode = "top",
        this.init()
    }
    return t.prototype.init = function() {
        this.isClick = !1,
        this._footer = document.getElementById("footer"),
        this._scroll = document.getElementById("footer-scroll"),
        this._scroll.style.cursor = "pointer",
        this._text = document.getElementById("footer-scroll-t"),
        $(this._scroll).css({
            rotate: "180deg",
            scale: .8
        });
        var t = this;
        this._scroll.addEventListener("click", function() {
            "top" === t._mode ? _main._sceneMng.pageSlide("works") : _main._sceneMng.pageSlide("top")
        }, !1)
    }
    ,
    t.prototype.changeMode = function(t) {
        "top" === (this._mode = t) ? (this.isClick = !1,
        $(this._scroll).transition({
            rotate: "180deg"
        }, 400),
        $(this._text).transition({
            opacity: 1
        }, 400)) : (this.isClick = !0,
        $(this._scroll).transition({
            rotate: "0deg"
        }, 400),
        $(this._text).transition({
            opacity: 0
        }, 400))
    }
    ,
    t
}()
  , FooterSpSet = function() {
    "use strict";
    function t() {
        this.init()
    }
    return t.prototype.init = function() {
        this._pTop = document.getElementById("footer-sp-mark")
    }
    ,
    t.prototype.contentsStart = function() {
        this._pTop.addEventListener("click", function() {
            _main._sceneMng.pageSlide("top")
        }, !1)
    }
    ,
    t
}()
  , JsonMng = function() {
    "use strict";
    function t() {
        this._itemCount = 0,
        this._listCount = 0,
        this._imgNum = 0,
        this._imgLoadedNum = 0,
        this._pipeline = 4,
        this._jsonMap = {},
        this.init()
    }
    return t.prototype.init = function() {
        var t;
        this._firstItem = [],
        _main._webGL && (t = [_main._conf._jsonFile],
        this._firstItem = [{
            _type: "json",
            _list: t
        }])
    }
    ,
    t.prototype.firstLoad = function() {
        for (var t = 0; t < this._pipeline; t++)
            this.pipelineLoad()
    }
    ,
    t.prototype.pipelineLoad = function() {
        var i, e, t, s = this;
        this._itemCount >= this._firstItem.length || (t = (i = this._firstItem[this._itemCount])._list[this._listCount],
        e = this._listCount,
        "json" === i._type && (t = t + "?v=" + Math.floor(1e4 * Math.random()),
        $.getJSON(t, function(t) {
            s.loadJsonEnd(t, i, e)
        })),
        this._imgNum++,
        this._listCount++,
        this._listCount >= i._list.length && (this._listCount = 0,
        this._itemCount++))
    }
    ,
    t.prototype.loadJsonEnd = function(t, i, e) {
        e = i._list[e];
        this._jsonMap[e] = t,
        this.fLoadCompCheck()
    }
    ,
    t.prototype.fLoadCompCheck = function() {
        this.pipelineLoad(),
        this._imgLoadedNum++,
        this._imgLoadedNum >= this._imgNum && _main.setJsonComp()
    }
    ,
    t.prototype.getJson = function(t) {
        var i, e = null;
        for (i in this._jsonMap)
            i.match(t) && (e = this._jsonMap[i]);
        return e
    }
    ,
    t
}()
  , LineSet = function() {
    "use strict";
    function t() {
        this.init()
    }
    return t.prototype.init = function() {
        this._geo = new THREE.BufferGeometry,
        this._vertexNum = 6;
        for (var t = new Float32Array(3 * this._vertexNum), i = new Float32Array(3 * this._vertexNum), e = [], s = ($(window).width(),
        .25 * -$(window).width()), h = .25 * $(window).width(), a = .5 * ($(window).height() + 200), o = [s, a, 0, s, -a, 0, 0, -a, 0, 0, a, 0, h, a, 0, h, -a, 0], n = 0; n < 3 * this._vertexNum; n += 3)
            t[n] = o[n],
            t[n + 1] = o[n + 1],
            t[n + 2] = o[n + 2],
            i[n] = 1,
            i[n + 1] = 1,
            i[n + 2] = 1,
            e[n] = o[n],
            e[n + 1] = o[n + 1],
            e[n + 2] = o[n + 2];
        this._geo.addAttribute("position", new THREE.BufferAttribute(t,3)),
        this._geo.addAttribute("color", new THREE.BufferAttribute(i,3));
        var _ = new Float32Array(this._vertexNum);
        for (n = 0; n < this._vertexNum; n++)
            _[n] = n;
        this._geo.addAttribute("id", new THREE.BufferAttribute(_,1)),
        this._shader = {
            vertexShader: _main._parts.getShader("assets/shader/bg_line_vtx.js"),
            fragmentShader: _main._parts.getShader("assets/shader/bg_line_frg.js"),
            uniforms: {
                alpha: {
                    value: .2
                },
                newPos: {
                    value: e
                }
            },
            transparent: !0,
            depthWrite: !1,
            depthTest: !1
        },
        this._mat = new THREE.ShaderMaterial(this._shader),
        this._mesh = new THREE.Line(this._geo,this._mat),
        _main._world._scene.add(this._mesh),
        addResize(this),
        this.onResize()
    }
    ,
    t.prototype.contentsStart = function() {
        this.onResize()
    }
    ,
    t.prototype.onResize = function() {
        $(window).width();
        for (var t = .25 * -$(window).width(), i = .25 * $(window).width(), e = .5 * ($(window).height() + 200), s = [t, e, 0, t, -e, 0, 0, -e, 0, 0, e, 0, i, e, 0, i, -e, 0], h = [], a = 0; a < 3 * this._vertexNum; a += 3)
            h[a] = s[a],
            h[a + 1] = s[a + 1],
            h[a + 2] = s[a + 2];
        this._shader.uniforms.newPos.value = h
    }
    ,
    t
}()
  , LoadingRing = function() {
    function t() {
        this.isAdd = !1,
        this._top = 0,
        this._left = 0,
        this._worksDetail = document.getElementById("works-detail"),
        this._memberDetail = document.getElementById("member-detail"),
        this._target = null,
        this._page = "",
        this.init()
    }
    return t.prototype.init = function() {
        this._ring = document.createElement("div"),
        this._ring.style.position = "absolute",
        "PC" === _main._device ? (this._ring.style.width = "60px",
        this._ring.style.height = "60px") : (this._ring.style.width = "30px",
        this._ring.style.height = "30px"),
        this._ring.style.opacity = 0,
        this._ring.style.overflow = "hidden",
        this._in1 = document.createElement("div"),
        this._in1.style.position = "absolute",
        this._in1.style.width = "100%",
        this._in1.style.height = "100%",
        this._in1.style.opacity = .7,
        this._in1.innerHTML = "<img src='assets/image/loading_ring.png' width='100%' height='auto' />",
        this._ring.appendChild(this._in1),
        addResize(this)
    }
    ,
    t.prototype.setLoading = function(t, i) {
        $(this._in1).stop(),
        $(this._in1).css({
            rotate: "0deg"
        }),
        this._page = t,
        this._target = i,
        this._top = $(this._target).offset().top,
        "works" === this._page ? this._left = $(this._worksDetail).offset().left : "member" === this._page && (this._left = $(this._memberDetail).offset().left),
        this._ring.style.left = this._left + "px",
        this._ring.style.top = this._top + "px",
        document.body.appendChild(this._ring),
        $(this._ring).css({
            opacity: 0
        }).animate({
            opacity: 1
        }, 300, "easeOutCubic"),
        this.rotate(),
        this.isAdd = !0
    }
    ,
    t.prototype.rotate = function() {
        var t = this;
        $(this._in1).animate({
            rotate: "180deg"
        }, 300, "linear", function() {
            t.rotate2()
        })
    }
    ,
    t.prototype.rotate2 = function() {
        var t = this;
        $(this._in1).animate({
            rotate: "360deg"
        }, 300, "linear", function() {
            $(t._in1).css({
                rotate: "0deg"
            }),
            t.rotate()
        })
    }
    ,
    t.prototype.removeLoading = function() {
        $(this._in1).stop(),
        $(this._in1).css({
            rotate: "0deg"
        });
        var t = this;
        $(this._ring).animate({
            opacity: 0
        }, 200, "easeOutCubic", function() {
            document.body.removeChild(t._ring),
            t.isAdd = !1
        })
    }
    ,
    t.prototype.onResize = function() {
        this.isAdd && (this._top = $(this._target).offset().top,
        "works" === this._page ? this._left = $(this._worksDetail).offset().left : "member" === this._page && (this._left = $(this._memberDetail).offset().left),
        this._ring.style.left = this._left + "px",
        this._ring.style.top = this._top + "px")
    }
    ,
    t
}();
