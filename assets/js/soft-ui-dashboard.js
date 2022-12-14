"use strict";
!(function () {
    var e, t;
    -1 < navigator.platform.indexOf("Win") &&
        (document.getElementsByClassName("main-content")[0] &&
            ((e = document.querySelector(".main-content")), new PerfectScrollbar(e)),
            document.getElementsByClassName("sidenav")[0] &&
            ((e = document.querySelector(".sidenav")), new PerfectScrollbar(e)),
            document.getElementsByClassName("navbar-collapse")[0] &&
            ((t = document.querySelector(
                ".navbar:not(.navbar-expand-lg) .navbar-collapse"
            )),
                new PerfectScrollbar(t)),
            document.getElementsByClassName("fixed-plugin")[0]) &&
        ((t = document.querySelector(".fixed-plugin")), new PerfectScrollbar(t));
})(),
    document.getElementById("navbarBlur") && navbarBlurOnScroll("navbarBlur");
var calendarEl,
    today,
    mYear,
    weekday,
    mDay,
    m,
    d,
    calendar,
    allInputs,
    fixedPlugin,
    fixedPluginButton,
    fixedPluginButtonNav,
    fixedPluginCard,
    fixedPluginCloseButton,
    navbar,
    buttonNavbarFixed,
    popoverTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="popover"]')
    ),
    popoverList = popoverTriggerList.map(function (e) {
        return new bootstrap.Popover(e);
    }),
    tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    ),
    tooltipList = tooltipTriggerList.map(function (e) {
        return new bootstrap.Tooltip(e);
    });
function focused(e) {
    e.parentElement.classList.contains("input-group") &&
        e.parentElement.classList.add("focused");
}
function defocused(e) {
    e.parentElement.classList.contains("input-group") &&
        e.parentElement.classList.remove("focused");
}
function setAttributes(t, a) {
    Object.keys(a).forEach(function (e) {
        t.setAttribute(e, a[e]);
    });
}
function dropDown(e) {
    if (!document.querySelector(".dropdown-hover")) {
        event.stopPropagation(), event.preventDefault();
        for (
            var t = e.parentElement.parentElement.children, a = 0;
            a < t.length;
            a++
        )
            t[a].lastElementChild != e.parentElement.lastElementChild &&
                t[a].lastElementChild.classList.remove("show");
        e.nextElementSibling.classList.contains("show")
            ? e.nextElementSibling.classList.remove("show")
            : e.nextElementSibling.classList.add("show");
    }
}
function sidebarColor(e) {
    for (
        var t,
        a = e.parentElement.children,
        n = e.getAttribute("data-color"),
        i = 0;
        i < a.length;
        i++
    )
        a[i].classList.remove("active");
    e.classList.contains("active")
        ? e.classList.remove("active")
        : e.classList.add("active"),
        document.querySelector(".sidenav").setAttribute("data-color", n),
        document.querySelector("#sidenavCard") &&
        ((e = [
            "card",
            "card-background",
            "shadow-none",
            "card-background-mask-" + n,
        ]),
            ((t = document.querySelector("#sidenavCard")).className = ""),
            t.classList.add(...e),
            (t = [
                "ni",
                "ni-diamond",
                "text-gradient",
                "text-lg",
                "top-0",
                "text-" + n,
            ]),
            ((e = document.querySelector("#sidenavCardIcon")).className = ""),
            e.classList.add(...t));
}
function sidebarType(e) {
    for (
        var t = e.parentElement.children,
        a = e.getAttribute("data-class"),
        n = document.querySelector("body:not(.dark-version)"),
        i = body.classList.contains("dark-version"),
        l = [],
        s = 0;
        s < t.length;
        s++
    )
        t[s].classList.remove("active"), l.push(t[s].getAttribute("data-class"));
    e.classList.contains("active")
        ? e.classList.remove("active")
        : e.classList.add("active");
    for (
        var r, o, c, d = document.querySelector(".sidenav"), s = 0;
        s < l.length;
        s++
    )
        d.classList.remove(l[s]);
    if ((d.classList.add(a), "bg-white" == a)) {
        var u = document.querySelectorAll(".sidenav .text-white");
        for (let e = 0; e < u.length; e++)
            u[e].classList.remove("text-white"), u[e].classList.add("text-dark");
    } else {
        var g = document.querySelectorAll(".sidenav .text-dark");
        for (let e = 0; e < g.length; e++)
            g[e].classList.add("text-white"), g[e].classList.remove("text-dark");
    }
    if ("bg-default" == a && i) {
        g = document.querySelectorAll(".navbar-brand .text-dark");
        for (let e = 0; e < g.length; e++)
            g[e].classList.add("text-white"), g[e].classList.remove("text-dark");
    }
    "bg-white" == a && n
        ? (o = (r = document.querySelector(".navbar-brand-img")).src).includes(
            "logo-ct.png"
        ) && ((c = o.replace("logo-ct", "logo-ct-dark")), (r.src = c))
        : (o = (r = document.querySelector(".navbar-brand-img")).src).includes(
            "logo-ct-dark.png"
        ) && ((c = o.replace("logo-ct-dark", "logo-ct")), (r.src = c)),
        "bg-white" == a &&
        i &&
        (o = (r = document.querySelector(".navbar-brand-img")).src).includes(
            "logo-ct.png"
        ) &&
        ((c = o.replace("logo-ct", "logo-ct-dark")), (r.src = c));
}
function navbarFixed(e) {
    var t = [
        "position-sticky",
        "blur",
        "shadow-blur",
        "mt-4",
        "left-auto",
        "top-1",
        "z-index-sticky",
    ],
        a = document.getElementById("navbarBlur");
    e.getAttribute("checked")
        ? (toggleNavLinksColor("transparent"),
            a.classList.remove(...t),
            a.setAttribute("data-scroll", "false"),
            navbarBlurOnScroll("navbarBlur"),
            e.removeAttribute("checked"))
        : (toggleNavLinksColor("blur"),
            a.classList.add(...t),
            a.setAttribute("data-scroll", "true"),
            navbarBlurOnScroll("navbarBlur"),
            e.setAttribute("checked", "true"));
}
function navbarMinimize(e) {
    var t = document.getElementsByClassName("g-sidenav-show")[0];
    e.getAttribute("checked")
        ? (t.classList.remove("g-sidenav-hidden"),
            t.classList.add("g-sidenav-pinned"),
            e.removeAttribute("checked"))
        : (t.classList.remove("g-sidenav-pinned"),
            t.classList.add("g-sidenav-hidden"),
            e.setAttribute("checked", "true"));
}
function toggleNavLinksColor(e) {
    var t = document.querySelectorAll(".navbar-main .nav-link"),
        a = document.querySelectorAll(".navbar-main .sidenav-toggler-line");
    "blur" === e
        ? (t.forEach((e) => {
            e.classList.remove("text-body");
        }),
            a.forEach((e) => {
                e.classList.add("bg-dark");
            }))
        : "transparent" === e &&
        (t.forEach((e) => {
            e.classList.add("text-body");
        }),
            a.forEach((e) => {
                e.classList.remove("bg-dark");
            }));
}
function navbarBlurOnScroll(e) {
    const t = document.getElementById(e);
    var a,
        e = !!t && t.getAttribute("data-scroll");
    let n = ["blur", "shadow-blur", "left-auto"],
        i = ["shadow-none"];
    function l() {
        t.classList.add(...n),
            t.classList.remove(...i),
            toggleNavLinksColor("blur");
    }
    function s() {
        t.classList.remove(...n),
            t.classList.add(...i),
            toggleNavLinksColor("transparent");
    }
    (5 < window.scrollY ? l : s)(),
        (window.onscroll = debounce(
            "true" == e
                ? function () {
                    (5 < window.scrollY ? l : s)();
                }
                : function () {
                    s();
                },
            10
        )),
        -1 < navigator.platform.indexOf("Win") &&
        ((a = document.querySelector(".main-content")),
            "true" == e
                ? a.addEventListener(
                    "ps-scroll-y",
                    debounce(function () {
                        (5 < a.scrollTop ? l : s)();
                    }, 10)
                )
                : a.addEventListener(
                    "ps-scroll-y",
                    debounce(function () {
                        s();
                    }, 10)
                ));
}
function debounce(n, i, l) {
    var s;
    return function () {
        var e = this,
            t = arguments,
            a = l && !s;
        clearTimeout(s),
            (s = setTimeout(function () {
                (s = null), l || n.apply(e, t);
            }, i)),
            a && n.apply(e, t);
    };
}
document.addEventListener("DOMContentLoaded", function () {
    [].slice.call(document.querySelectorAll(".toast")).map(function (e) {
        return new bootstrap.Toast(e);
    });
    [].slice.call(document.querySelectorAll(".toast-btn")).map(function (t) {
        t.addEventListener("click", function () {
            var e = document.getElementById(t.dataset.target);
            e && bootstrap.Toast.getInstance(e).show();
        });
    });
}),
    document.querySelector('[data-toggle="widget-calendar"]') &&
    ((calendarEl = document.querySelector('[data-toggle="widget-calendar"]')),
        (mYear = (today = new Date()).getFullYear()),
        (mDay = (weekday = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ])[today.getDay()]),
        (m = today.getMonth()),
        (d = today.getDate()),
        (document.getElementsByClassName("widget-calendar-year")[0].innerHTML =
            mYear),
        (document.getElementsByClassName("widget-calendar-day")[0].innerHTML =
            mDay),
        (calendar = new FullCalendar.Calendar(calendarEl, {
            contentHeight: "auto",
            initialView: "dayGridMonth",
            selectable: !0,
            initialDate: "2020-12-01",
            editable: !0,
            headerToolbar: !1,
            events: [
                {
                    title: "Call with Dave",
                    start: "2020-11-18",
                    end: "2020-11-18",
                    className: "bg-gradient-danger",
                },
                {
                    title: "Lunch meeting",
                    start: "2020-11-21",
                    end: "2020-11-22",
                    className: "bg-gradient-warning",
                },
                {
                    title: "All day conference",
                    start: "2020-11-29",
                    end: "2020-11-29",
                    className: "bg-gradient-success",
                },
                {
                    title: "Meeting with Mary",
                    start: "2020-12-01",
                    end: "2020-12-01",
                    className: "bg-gradient-info",
                },
                {
                    title: "Winter Hackaton",
                    start: "2020-12-03",
                    end: "2020-12-03",
                    className: "bg-gradient-danger",
                },
                {
                    title: "Digital event",
                    start: "2020-12-07",
                    end: "2020-12-09",
                    className: "bg-gradient-warning",
                },
                {
                    title: "Marketing event",
                    start: "2020-12-10",
                    end: "2020-12-10",
                    className: "bg-gradient-primary",
                },
                {
                    title: "Dinner with Family",
                    start: "2020-12-19",
                    end: "2020-12-19",
                    className: "bg-gradient-danger",
                },
                {
                    title: "Black Friday",
                    start: "2020-12-23",
                    end: "2020-12-23",
                    className: "bg-gradient-info",
                },
                {
                    title: "Cyber Week",
                    start: "2020-12-02",
                    end: "2020-12-02",
                    className: "bg-gradient-warning",
                },
            ],
        })).render()),
    0 != document.querySelectorAll(".input-group").length &&
    (allInputs = document.querySelectorAll("input.form-control")).forEach((e) =>
        setAttributes(e, {
            onfocus: "focused(this)",
            onfocusout: "defocused(this)",
        })
    ),
    document.querySelector(".fixed-plugin") &&
    ((fixedPlugin = document.querySelector(".fixed-plugin")),
        (fixedPluginButton = document.querySelector(".fixed-plugin-button")),
        (fixedPluginButtonNav = document.querySelector(".fixed-plugin-button-nav")),
        (fixedPluginCard = document.querySelector(".fixed-plugin .card")),
        (fixedPluginCloseButton = document.querySelectorAll(
            ".fixed-plugin-close-button"
        )),
        (navbar = document.getElementById("navbarBlur")),
        (buttonNavbarFixed = document.getElementById("navbarFixed")),
        fixedPluginButton &&
        (fixedPluginButton.onclick = function () {
            fixedPlugin.classList.contains("show")
                ? fixedPlugin.classList.remove("show")
                : fixedPlugin.classList.add("show");
        }),
        fixedPluginButtonNav &&
        (fixedPluginButtonNav.onclick = function () {
            fixedPlugin.classList.contains("show")
                ? fixedPlugin.classList.remove("show")
                : fixedPlugin.classList.add("show");
        }),
        fixedPluginCloseButton.forEach(function (e) {
            e.onclick = function () {
                fixedPlugin.classList.remove("show");
            };
        }),
        (document.querySelector("body").onclick = function (e) {
            e.target != fixedPluginButton &&
                e.target != fixedPluginButtonNav &&
                e.target.closest(".fixed-plugin .card") != fixedPluginCard &&
                fixedPlugin.classList.remove("show");
        }),
        navbar) &&
    "true" == navbar.getAttribute("data-scroll") &&
    buttonNavbarFixed &&
    buttonNavbarFixed.setAttribute("checked", "true");
var sidenavToggler,
    sidenavShow,
    toggleNavbarMinimize,
    total = document.querySelectorAll(".nav-pills");
function initNavs() {
    total.forEach(function (l, e) {
        var s = document.createElement("div"),
            t = l.querySelector("li:first-child .nav-link").cloneNode();
        (t.innerHTML = "-"),
            s.classList.add("moving-tab", "position-absolute", "nav-link"),
            s.appendChild(t),
            l.appendChild(s),
            l.getElementsByTagName("li").length;
        (s.style.padding = "0px"),
            (s.style.width = l.querySelector("li:nth-child(1)").offsetWidth + "px"),
            (s.style.transform = "translate3d(0px, 0px, 0px)"),
            (s.style.transition = ".5s ease"),
            (l.onmouseover = function (e) {
                let i = getEventTarget(e).closest("li");
                if (i) {
                    let a = Array.from(i.closest("ul").children),
                        n = a.indexOf(i) + 1;
                    l.querySelector("li:nth-child(" + n + ") .nav-link").onclick =
                        function () {
                            s = l.querySelector(".moving-tab");
                            let e = 0;
                            if (l.classList.contains("flex-column")) {
                                for (var t = 1; t <= a.indexOf(i); t++)
                                    e += l.querySelector("li:nth-child(" + t + ")").offsetHeight;
                                (s.style.transform = "translate3d(0px," + e + "px, 0px)"),
                                    (s.style.height = l.querySelector(
                                        "li:nth-child(" + t + ")"
                                    ).offsetHeight);
                            } else {
                                for (t = 1; t <= a.indexOf(i); t++)
                                    e += l.querySelector("li:nth-child(" + t + ")").offsetWidth;
                                (s.style.transform = "translate3d(" + e + "px, 0px, 0px)"),
                                    (s.style.width =
                                        l.querySelector("li:nth-child(" + n + ")").offsetWidth +
                                        "px");
                            }
                        };
                }
            }),
            window.innerWidth < 991 &&
            total.forEach(function (t, e) {
                if (!t.classList.contains("flex-column")) {
                    t.classList.remove("flex-row"),
                        t.classList.add("flex-column", "on-resize");
                    var a = t.querySelector(".nav-link.active").parentElement,
                        n = Array.from(a.closest("ul").children);
                    n.indexOf(a);
                    let e = 0;
                    for (var i = 1; i <= n.indexOf(a); i++)
                        e += t.querySelector("li:nth-child(" + i + ")").offsetHeight;
                    var l = document.querySelector(".moving-tab");
                    (l.style.width =
                        t.querySelector("li:nth-child(1)").offsetWidth + "px"),
                        (l.style.transform = "translate3d(0px," + e + "px, 0px)");
                }
            });
    });
}
function getEventTarget(e) {
    return (e = e || window.event).target || e.srcElement;
}
setTimeout(function () {
    initNavs();
}, 100),
    window.addEventListener("resize", function (e) {
        total.forEach(function (t, e) {
            t.querySelector(".moving-tab").remove();
            var a = document.createElement("div"),
                n = t.querySelector(".nav-link.active").cloneNode(),
                i =
                    ((n.innerHTML = "-"),
                        a.classList.add("moving-tab", "position-absolute", "nav-link"),
                        a.appendChild(n),
                        t.appendChild(a),
                        (a.style.padding = "0px"),
                        (a.style.transition = ".5s ease"),
                        t.querySelector(".nav-link.active").parentElement);
            if (i) {
                var l = Array.from(i.closest("ul").children),
                    n = l.indexOf(i) + 1;
                let e = 0;
                if (t.classList.contains("flex-column")) {
                    for (var s = 1; s <= l.indexOf(i); s++)
                        e += t.querySelector("li:nth-child(" + s + ")").offsetHeight;
                    (a.style.transform = "translate3d(0px," + e + "px, 0px)"),
                        (a.style.width =
                            t.querySelector("li:nth-child(" + n + ")").offsetWidth + "px"),
                        (a.style.height = t.querySelector(
                            "li:nth-child(" + s + ")"
                        ).offsetHeight);
                } else {
                    for (s = 1; s <= l.indexOf(i); s++)
                        e += t.querySelector("li:nth-child(" + s + ")").offsetWidth;
                    (a.style.transform = "translate3d(" + e + "px, 0px, 0px)"),
                        (a.style.width =
                            t.querySelector("li:nth-child(" + n + ")").offsetWidth + "px");
                }
            }
        }),
            window.innerWidth < 991
                ? total.forEach(function (t, e) {
                    if (!t.classList.contains("flex-column")) {
                        t.classList.remove("flex-row"),
                            t.classList.add("flex-column", "on-resize");
                        var a = t.querySelector(".nav-link.active").parentElement,
                            n = Array.from(a.closest("ul").children);
                        n.indexOf(a);
                        let e = 0;
                        for (var i = 1; i <= n.indexOf(a); i++)
                            e += t.querySelector("li:nth-child(" + i + ")").offsetHeight;
                        var l = document.querySelector(".moving-tab");
                        (l.style.width =
                            t.querySelector("li:nth-child(1)").offsetWidth + "px"),
                            (l.style.transform = "translate3d(0px," + e + "px, 0px)");
                    }
                })
                : total.forEach(function (t, e) {
                    if (t.classList.contains("on-resize")) {
                        t.classList.remove("flex-column", "on-resize"),
                            t.classList.add("flex-row");
                        var a = t.querySelector(".nav-link.active").parentElement,
                            n = Array.from(a.closest("ul").children),
                            i = n.indexOf(a) + 1;
                        let e = 0;
                        for (var l = 1; l <= n.indexOf(a); l++)
                            e += t.querySelector("li:nth-child(" + l + ")").offsetWidth;
                        var s = document.querySelector(".moving-tab");
                        (s.style.transform = "translate3d(" + e + "px, 0px, 0px)"),
                            (s.style.width =
                                t.querySelector("li:nth-child(" + i + ")").offsetWidth +
                                "px");
                    }
                });
    }),
    window.innerWidth < 991 &&
    total.forEach(function (e, t) {
        e.classList.contains("flex-row") &&
            (e.classList.remove("flex-row"),
                e.classList.add("flex-column", "on-resize"));
    }),
    document.querySelector(".sidenav-toggler") &&
    ((sidenavToggler = document.getElementsByClassName("sidenav-toggler")[0]),
        (sidenavShow = document.getElementsByClassName("g-sidenav-show")[0]),
        (toggleNavbarMinimize = document.getElementById("navbarMinimize")),
        sidenavShow) &&
    (sidenavToggler.onclick = function () {
        sidenavShow.classList.contains("g-sidenav-hidden")
            ? (sidenavShow.classList.remove("g-sidenav-hidden"),
                sidenavShow.classList.add("g-sidenav-pinned"),
                toggleNavbarMinimize &&
                (toggleNavbarMinimize.click(),
                    toggleNavbarMinimize.removeAttribute("checked")))
            : (sidenavShow.classList.remove("g-sidenav-pinned"),
                sidenavShow.classList.add("g-sidenav-hidden"),
                toggleNavbarMinimize &&
                (toggleNavbarMinimize.click(),
                    toggleNavbarMinimize.setAttribute("checked", "true")));
    });
const iconNavbarSidenav = document.getElementById("iconNavbarSidenav"),
    iconSidenav = document.getElementById("iconSidenav"),
    sidenav = document.getElementById("sidenav-main");
let body = document.getElementsByTagName("body")[0],
    className = "g-sidenav-pinned";
function toggleSidenav() {
    body.classList.contains(className)
        ? (body.classList.remove(className),
            setTimeout(function () {
                sidenav.classList.remove("bg-white");
            }, 100),
            sidenav.classList.remove("bg-transparent"))
        : (body.classList.add(className),
            sidenav.classList.add("bg-white"),
            sidenav.classList.remove("bg-transparent"),
            iconSidenav.classList.remove("d-none"));
}
iconNavbarSidenav && iconNavbarSidenav.addEventListener("click", toggleSidenav),
    iconSidenav && iconSidenav.addEventListener("click", toggleSidenav);
let referenceButtons = document.querySelector("[data-class]");
function navbarColorOnResize() {
    sidenav &&
        (1200 < window.innerWidth
            ? referenceButtons.classList.contains("active") &&
                "bg-transparent" === referenceButtons.getAttribute("data-class")
                ? sidenav.classList.remove("bg-white")
                : sidenav.classList.add("bg-white")
            : (sidenav.classList.add("bg-white"),
                sidenav.classList.remove("bg-transparent")));
}
function sidenavTypeOnResize() {
    var e = document.querySelectorAll('[onclick="sidebarType(this)"]');
    window.innerWidth < 1200
        ? e.forEach(function (e) {
            e.classList.add("disabled");
        })
        : e.forEach(function (e) {
            e.classList.remove("disabled");
        });
}
function notify(e) {
    var t = document.querySelector("body"),
        a = document.createElement("div");
    a.classList.add(
        "alert",
        "position-absolute",
        "top-0",
        "border-0",
        "text-white",
        "w-50",
        "end-0",
        "start-0",
        "mt-2",
        "mx-auto",
        "py-2"
    ),
        a.classList.add("alert-" + e.getAttribute("data-type")),
        (a.style.transform = "translate3d(0px, 0px, 0px)"),
        (a.style.opacity = "0"),
        (a.style.transition = ".35s ease"),
        setTimeout(function () {
            (a.style.transform = "translate3d(0px, 20px, 0px)"),
                a.style.setProperty("opacity", "1", "important");
        }, 100),
        (a.innerHTML =
            '<div class="d-flex mb-1"><div class="alert-icon me-1"><i class="' +
            e.getAttribute("data-icon") +
            ' mt-1"></i></div><span class="alert-text"><strong>' +
            e.getAttribute("data-title") +
            '</strong></span></div><span class="text-sm">' +
            e.getAttribute("data-content") +
            "</span>"),
        t.appendChild(a),
        setTimeout(function () {
            (a.style.transform = "translate3d(0px, 0px, 0px)"),
                a.style.setProperty("opacity", "0", "important");
        }, 4e3),
        setTimeout(function () {
            e.parentElement.querySelector(".alert").remove();
        }, 4500);
}
function darkMode(e) {
    var t,
        a = document.getElementsByTagName("body")[0],
        n = document.querySelectorAll("div:not(.sidenav) > hr"),
        i = document.querySelector(".sidenav"),
        l = document.querySelectorAll(".sidenav.bg-white"),
        s = document.querySelectorAll("div:not(.bg-gradient-dark) hr"),
        r = document.querySelectorAll("button:not(.btn) > .text-dark"),
        o = document.querySelectorAll("span.text-dark, .breadcrumb .text-dark"),
        c = document.querySelectorAll("span.text-white, .breadcrumb .text-white"),
        d = document.querySelectorAll("strong.text-dark"),
        u = document.querySelectorAll("strong.text-white"),
        g = document.querySelectorAll("a.nav-link.text-dark"),
        m = document.querySelectorAll(".text-secondary"),
        v = document.querySelectorAll(".text-white"),
        f = document.querySelectorAll(".bg-gray-100"),
        h = document.querySelectorAll(".bg-gray-600"),
        b = document.querySelectorAll(
            ".btn.btn-link.text-dark, .btn .ni.text-dark"
        ),
        y = document.querySelectorAll(
            ".btn.btn-link.text-white, .btn .ni.text-white"
        ),
        p = document.querySelectorAll(".card.border"),
        x = document.querySelectorAll(".card.border.border-dark"),
        w = document.querySelectorAll(".navbar g"),
        L = document.querySelector(".navbar-brand-img"),
        S = L.src,
        k = document.querySelectorAll(
            ".navbar-main .nav-link, .navbar-main .breadcrumb-item, .navbar-main .breadcrumb-item a"
        ),
        q = document.querySelectorAll(".card .nav .nav-link i"),
        A = document.querySelectorAll(".card .nav .nav-link span"),
        C = document.querySelectorAll(".fixed-plugin > .card"),
        B = document.querySelectorAll(".main-content .container-fluid .card");
    if (e.getAttribute("checked")) {
        a.classList.remove("dark-version"),
            i.classList.add("bg-white"),
            S.includes("logo-ct.png") &&
            ((t = S.replace("logo-ct", "logo-ct-dark")), (L.src = t));
        for (E = 0; E < k.length; E++)
            k[E].classList.contains("text-dark") &&
                (k[E].classList.add("text-white"), k[E].classList.remove("text-dark"));
        for (E = 0; E < q.length; E++)
            q[E].classList.contains("text-white") &&
                (q[E].classList.remove("text-white"), q[E].classList.add("text-dark"));
        for (E = 0; E < A.length; E++)
            A[E].classList.contains("text-white") &&
                A[E].classList.remove("text-white");
        for (E = 0; E < B.length; E++) B[E].classList.add("blur", "shadow-blur");
        for (E = 0; E < C.length; E++) C[E].classList.add("blur");
        for (E = 0; E < n.length; E++)
            n[E].classList.contains("light") &&
                (n[E].classList.add("dark"), n[E].classList.remove("light"));
        for (E = 0; E < s.length; E++)
            s[E].classList.contains("light") &&
                (s[E].classList.add("dark"), s[E].classList.remove("light"));
        for (E = 0; E < r.length; E++)
            r[E].classList.contains("text-white") &&
                (r[E].classList.remove("text-white"), r[E].classList.add("text-dark"));
        for (E = 0; E < c.length; E++)
            !c[E].classList.contains("text-white") ||
                c[E].closest(".sidenav") ||
                c[E].closest(".card.bg-gradient-dark") ||
                (c[E].classList.remove("text-white"), c[E].classList.add("text-dark"));
        for (E = 0; E < u.length; E++)
            u[E].classList.contains("text-white") &&
                (u[E].classList.remove("text-white"), u[E].classList.add("text-dark"));
        for (E = 0; E < v.length; E++)
            v[E].classList.contains("text-white") &&
                (v[E].classList.remove("text-white"),
                    v[E].classList.remove("opacity-8"),
                    v[E].classList.add("text-secondary"));
        for (E = 0; E < h.length; E++)
            h[E].classList.contains("bg-gray-600") &&
                (h[E].classList.remove("bg-gray-600"),
                    h[E].classList.add("bg-gray-100"));
        for (E = 0; E < w.length; E++)
            w[E].hasAttribute("fill") && w[E].setAttribute("fill", "#6c757d");
        for (E = 0; E < y.length; E++)
            y[E].closest(".card.bg-gradient-dark") ||
                (y[E].classList.remove("text-white"), y[E].classList.add("text-dark"));
        for (E = 0; E < x.length; E++) x[E].classList.remove("border-dark");
        e.removeAttribute("checked");
    } else {
        a.classList.add("dark-version"),
            S.includes("logo-ct-dark.png") &&
            ((t = S.replace("logo-ct-dark", "logo-ct")), (L.src = t));
        for (var E = 0; E < B.length; E++)
            B[E].classList.contains("blur") &&
                B[E].classList.remove("blur", "shadow-blur");
        for (var E = 0; E < k.length; E++)
            k[E].classList.contains("text-white") &&
                k[E].classList.remove("text-white");
        for (var E = 0; E < C.length; E++)
            C[E].classList.contains("blur") && C[E].classList.remove("blur");
        for (var E = 0; E < q.length; E++)
            q[E].classList.contains("text-dark") &&
                (q[E].classList.remove("text-dark"), q[E].classList.add("text-white"));
        for (var E = 0; E < A.length; E++)
            A[E].classList.contains("text-sm") && A[E].classList.add("text-white");
        for (var E = 0; E < n.length; E++)
            n[E].classList.contains("dark") &&
                (n[E].classList.remove("dark"), n[E].classList.add("light"));
        for (var E = 0; E < s.length; E++)
            s[E].classList.contains("dark") &&
                (s[E].classList.remove("dark"), s[E].classList.add("light"));
        for (var E = 0; E < r.length; E++)
            r[E].classList.contains("text-dark") &&
                (r[E].classList.remove("text-dark"), r[E].classList.add("text-white"));
        for (var E = 0; E < o.length; E++)
            o[E].classList.contains("text-dark") &&
                (o[E].classList.remove("text-dark"), o[E].classList.add("text-white"));
        for (var E = 0; E < d.length; E++)
            d[E].classList.contains("text-dark") &&
                (d[E].classList.remove("text-dark"), d[E].classList.add("text-white"));
        for (var E = 0; E < g.length; E++)
            g[E].classList.contains("text-dark") &&
                (g[E].classList.remove("text-dark"), g[E].classList.add("text-white"));
        for (var E = 0; E < m.length; E++)
            m[E].classList.contains("text-secondary") &&
                (m[E].classList.remove("text-secondary"),
                    m[E].classList.add("text-white"),
                    m[E].classList.add("opacity-8"));
        for (var E = 0; E < f.length; E++)
            f[E].classList.contains("bg-gray-100") &&
                (f[E].classList.remove("bg-gray-100"),
                    f[E].classList.add("bg-gray-600"));
        for (var E = 0; E < b.length; E++)
            b[E].classList.remove("text-dark"), b[E].classList.add("text-white");
        for (var E = 0; E < l.length; E++) l[E].classList.remove("bg-white");
        for (var E = 0; E < w.length; E++)
            w[E].hasAttribute("fill") && w[E].setAttribute("fill", "#fff");
        for (E = 0; E < p.length; E++) p[E].classList.add("border-dark");
        e.setAttribute("checked", "true");
    }
}
window.addEventListener("resize", navbarColorOnResize),
    window.addEventListener("resize", sidenavTypeOnResize),
    window.addEventListener("load", sidenavTypeOnResize);
var soft = {
    initFullCalendar: function () {
        document.addEventListener("DOMContentLoaded", function () {
            var e = document.getElementById("fullCalendar"),
                t = new Date(),
                a = t.getFullYear(),
                n = t.getMonth(),
                t = t.getDate(),
                i = new FullCalendar.Calendar(e, {
                    initialView: "dayGridMonth",
                    selectable: !0,
                    headerToolbar: {
                        left: "title",
                        center: "dayGridMonth,timeGridWeek,timeGridDay",
                        right: "prev,next today",
                    },
                    select: function (a) {
                        Swal.fire({
                            title: "Create an Event",
                            html: '<div class="form-group"><input class="form-control text-default" placeholder="Event Title" id="input-field"></div>',
                            showCancelButton: !0,
                            customClass: {
                                confirmButton: "btn btn-primary",
                                cancelButton: "btn btn-danger",
                            },
                            buttonsStyling: !1,
                        }).then(function (e) {
                            var t = document.getElementById("input-field").value;
                            t &&
                                ((t = { title: t, start: a.startStr, end: a.endStr }),
                                    i.addEvent(t));
                        });
                    },
                    editable: !0,
                    events: [
                        {
                            title: "All Day Event",
                            start: new Date(a, n, 1),
                            className: "event-default",
                        },
                        {
                            id: 999,
                            title: "Repeating Event",
                            start: new Date(a, n, t - 4, 6, 0),
                            allDay: !1,
                            className: "event-rose",
                        },
                        {
                            id: 999,
                            title: "Repeating Event",
                            start: new Date(a, n, t + 3, 6, 0),
                            allDay: !1,
                            className: "event-rose",
                        },
                        {
                            title: "Meeting",
                            start: new Date(a, n, t - 1, 10, 30),
                            allDay: !1,
                            className: "event-green",
                        },
                        {
                            title: "Lunch",
                            start: new Date(a, n, t + 7, 12, 0),
                            end: new Date(a, n, t + 7, 14, 0),
                            allDay: !1,
                            className: "event-red",
                        },
                        {
                            title: "Md-pro Launch",
                            start: new Date(a, n, t - 2, 12, 0),
                            allDay: !0,
                            className: "event-azure",
                        },
                        {
                            title: "Birthday Party",
                            start: new Date(a, n, t + 1, 19, 0),
                            end: new Date(a, n, t + 1, 22, 30),
                            allDay: !1,
                            className: "event-azure",
                        },
                        {
                            title: "Click for Creative Tim",
                            start: new Date(a, n, 21),
                            end: new Date(a, n, 22),
                            url: "http://www.creative-tim.com/",
                            className: "event-orange",
                        },
                        {
                            title: "Click for Google",
                            start: new Date(a, n, 23),
                            end: new Date(a, n, 23),
                            url: "http://www.creative-tim.com/",
                            className: "event-orange",
                        },
                    ],
                });
            i.render();
        });
    },
    datatableSimple: function () {
        var t = {
            columnDefs: [
                { field: "athlete", minWidth: 150, sortable: !0, filter: !0 },
                { field: "age", maxWidth: 90, sortable: !0, filter: !0 },
                { field: "country", minWidth: 150, sortable: !0, filter: !0 },
                { field: "year", maxWidth: 90, sortable: !0, filter: !0 },
                { field: "date", minWidth: 150, sortable: !0, filter: !0 },
                { field: "sport", minWidth: 150, sortable: !0, filter: !0 },
                { field: "gold" },
                { field: "silver" },
                { field: "bronze" },
                { field: "total" },
            ],
            rowSelection: "multiple",
            rowMultiSelectWithClick: !0,
            rowData: [
                {
                    athlete: "Ronald Valencia",
                    age: 23,
                    country: "United States",
                    year: 2008,
                    date: "24/08/2008",
                    sport: "Swimming",
                    gold: 8,
                    silver: 0,
                    bronze: 0,
                    total: 8,
                },
                {
                    athlete: "Lorand Frentz",
                    age: 19,
                    country: "United States",
                    year: 2004,
                    date: "29/08/2004",
                    sport: "Swimming",
                    gold: 6,
                    silver: 0,
                    bronze: 2,
                    total: 8,
                },
                {
                    athlete: "Michael Phelps",
                    age: 27,
                    country: "United States",
                    year: 2012,
                    date: "12/08/2012",
                    sport: "Swimming",
                    gold: 4,
                    silver: 2,
                    bronze: 0,
                    total: 6,
                },
                {
                    athlete: "Natalie Coughlin",
                    age: 25,
                    country: "United States",
                    year: 2008,
                    date: "24/08/2008",
                    sport: "Swimming",
                    gold: 1,
                    silver: 2,
                    bronze: 3,
                    total: 6,
                },
                {
                    athlete: "Aleksey Nemov",
                    age: 24,
                    country: "Russia",
                    year: 2e3,
                    date: "01/10/2000",
                    sport: "Gymnastics",
                    gold: 2,
                    silver: 1,
                    bronze: 3,
                    total: 6,
                },
                {
                    athlete: "Alicia Coutts",
                    age: 24,
                    country: "Australia",
                    year: 2012,
                    date: "12/08/2012",
                    sport: "Swimming",
                    gold: 1,
                    silver: 3,
                    bronze: 1,
                    total: 5,
                },
                {
                    athlete: "Missy Franklin",
                    age: 17,
                    country: "United States",
                    year: 2012,
                    date: "12/08/2012",
                    sport: "Swimming",
                    gold: 4,
                    silver: 0,
                    bronze: 1,
                    total: 5,
                },
                {
                    athlete: "Ryan Lochte",
                    age: 27,
                    country: "United States",
                    year: 2012,
                    date: "12/08/2012",
                    sport: "Swimming",
                    gold: 2,
                    silver: 2,
                    bronze: 1,
                    total: 5,
                },
                {
                    athlete: "Allison Schmitt",
                    age: 22,
                    country: "United States",
                    year: 2012,
                    date: "12/08/2012",
                    sport: "Swimming",
                    gold: 3,
                    silver: 1,
                    bronze: 1,
                    total: 5,
                },
                {
                    athlete: "Natalie Coughlin",
                    age: 21,
                    country: "United States",
                    year: 2004,
                    date: "29/08/2004",
                    sport: "Swimming",
                    gold: 2,
                    silver: 2,
                    bronze: 1,
                    total: 5,
                },
                {
                    athlete: "Ian Thorpe",
                    age: 17,
                    country: "Australia",
                    year: 2e3,
                    date: "01/10/2000",
                    sport: "Swimming",
                    gold: 3,
                    silver: 2,
                    bronze: 0,
                    total: 5,
                },
                {
                    athlete: "Dara Torres",
                    age: 33,
                    country: "United States",
                    year: 2e3,
                    date: "01/10/2000",
                    sport: "Swimming",
                    gold: 2,
                    silver: 0,
                    bronze: 3,
                    total: 5,
                },
                {
                    athlete: "Cindy Klassen",
                    age: 26,
                    country: "Canada",
                    year: 2006,
                    date: "26/02/2006",
                    sport: "Speed Skating",
                    gold: 1,
                    silver: 2,
                    bronze: 2,
                    total: 5,
                },
                {
                    athlete: "Nastia Liukin",
                    age: 18,
                    country: "United States",
                    year: 2008,
                    date: "24/08/2008",
                    sport: "Gymnastics",
                    gold: 1,
                    silver: 3,
                    bronze: 1,
                    total: 5,
                },
                {
                    athlete: "Marit Bjørgen",
                    age: 29,
                    country: "Norway",
                    year: 2010,
                    date: "28/02/2010",
                    sport: "Cross Country Skiing",
                    gold: 3,
                    silver: 1,
                    bronze: 1,
                    total: 5,
                },
                {
                    athlete: "Sun Yang",
                    age: 20,
                    country: "China",
                    year: 2012,
                    date: "12/08/2012",
                    sport: "Swimming",
                    gold: 2,
                    silver: 1,
                    bronze: 1,
                    total: 4,
                },
            ],
        };
        document.addEventListener("DOMContentLoaded", function () {
            var e = document.querySelector("#datatableSimple");
            new agGrid.Grid(e, t);
        });
    },
    initVectorMap: function () {
        am4core.ready(function () {
            am4core.useTheme(am4themes_animated);
            var e = am4core.create("chartdiv", am4maps.MapChart),
                t =
                    ((e.geodata = am4geodata_worldLow),
                        (e.projection = new am4maps.projections.Miller()),
                        e.series.push(new am4maps.MapPolygonSeries())),
                t = ((t.exclude = ["AQ"]), (t.useGeodata = !0), t.mapPolygons.template);
            (t.tooltipText = "{name}"), (t.polygon.fillOpacity = 0.6);
            t.states.create("hover").properties.fill = e.colors.getIndex(0);
            (t = e.series.push(new am4maps.MapImageSeries())),
                (t.mapImages.template.propertyFields.longitude = "longitude"),
                (t.mapImages.template.propertyFields.latitude = "latitude"),
                (t.mapImages.template.tooltipText = "{title}"),
                (t.mapImages.template.propertyFields.url = "url"),
                (e = t.mapImages.template.createChild(am4core.Circle)),
                (e.radius = 3),
                (e.propertyFields.fill = "color"),
                (e = t.mapImages.template.createChild(am4core.Circle));
            (e.radius = 3),
                (e.propertyFields.fill = "color"),
                e.events.on("inited", function (e) {
                    !(function t(e) {
                        e = e.animate(
                            [
                                { property: "scale", from: 1, to: 5 },
                                { property: "opacity", from: 1, to: 0 },
                            ],
                            1e3,
                            am4core.ease.circleOut
                        );
                        e.events.on("animationended", function (e) {
                            t(e.target.object);
                        });
                    })(e.target);
                });
            e = new am4core.ColorSet();
            t.data = [
                {
                    title: "Brussels",
                    latitude: 50.8371,
                    longitude: 4.3676,
                    color: e.next(),
                },
                {
                    title: "Copenhagen",
                    latitude: 55.6763,
                    longitude: 12.5681,
                    color: e.next(),
                },
                {
                    title: "Paris",
                    latitude: 48.8567,
                    longitude: 2.351,
                    color: e.next(),
                },
                {
                    title: "Reykjavik",
                    latitude: 64.1353,
                    longitude: -21.8952,
                    color: e.next(),
                },
                {
                    title: "Moscow",
                    latitude: 55.7558,
                    longitude: 37.6176,
                    color: e.next(),
                },
                {
                    title: "Madrid",
                    latitude: 40.4167,
                    longitude: -3.7033,
                    color: e.next(),
                },
                {
                    title: "London",
                    latitude: 51.5002,
                    longitude: -0.1262,
                    url: "http://www.google.co.uk",
                    color: e.next(),
                },
                {
                    title: "Peking",
                    latitude: 39.9056,
                    longitude: 116.3958,
                    color: e.next(),
                },
                {
                    title: "New Delhi",
                    latitude: 28.6353,
                    longitude: 77.225,
                    color: e.next(),
                },
                {
                    title: "Tokyo",
                    latitude: 35.6785,
                    longitude: 139.6823,
                    url: "http://www.google.co.jp",
                    color: e.next(),
                },
                {
                    title: "Ankara",
                    latitude: 39.9439,
                    longitude: 32.856,
                    color: e.next(),
                },
                {
                    title: "Buenos Aires",
                    latitude: -34.6118,
                    longitude: -58.4173,
                    color: e.next(),
                },
                {
                    title: "Brasilia",
                    latitude: -15.7801,
                    longitude: -47.9292,
                    color: e.next(),
                },
                {
                    title: "Ottawa",
                    latitude: 45.4235,
                    longitude: -75.6979,
                    color: e.next(),
                },
                {
                    title: "Washington",
                    latitude: 38.8921,
                    longitude: -77.0241,
                    color: e.next(),
                },
                {
                    title: "Kinshasa",
                    latitude: -4.3369,
                    longitude: 15.3271,
                    color: e.next(),
                },
                {
                    title: "Cairo",
                    latitude: 30.0571,
                    longitude: 31.2272,
                    color: e.next(),
                },
                {
                    title: "Pretoria",
                    latitude: -25.7463,
                    longitude: 28.1876,
                    color: e.next(),
                },
            ];
        });
    },
    showSwal: function (e) {
        if ("basic" == e) Swal.fire("Any fool can use a computer");
        else if ("title-and-text" == e)
            Swal.mixin({
                customClass: {
                    confirmButton: "btn bg-gradient-success",
                    cancelButton: "btn bg-gradient-danger",
                },
            }).fire({
                title: "Sweet!",
                text: "Modal with a custom image.",
                imageUrl: "https://unsplash.it/400/200",
                imageWidth: 400,
                imageAlt: "Custom image",
            });
        else if ("success-message" == e)
            Swal.fire("Good job!", "You clicked the button!", "success");
        else if ("warning-message-and-confirmation" == e) {
            const t = Swal.mixin({
                customClass: {
                    confirmButton: "btn bg-gradient-success",
                    cancelButton: "btn bg-gradient-danger",
                },
                buttonsStyling: !1,
            });
            t.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                type: "warning",
                showCancelButton: !0,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: !0,
            }).then((e) => {
                e.value
                    ? t.fire("Deleted!", "Your file has been deleted.", "success")
                    : e.dismiss === Swal.DismissReason.cancel &&
                    t.fire("Cancelled", "Your imaginary file is safe :)", "error");
            });
        } else if ("warning-message-and-cancel" == e)
            Swal.mixin({
                customClass: {
                    confirmButton: "btn bg-gradient-success",
                    cancelButton: "btn bg-gradient-danger",
                },
                buttonsStyling: !1,
            })
                .fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: !0,
                    confirmButtonText: "Yes, delete it!",
                })
                .then((e) => {
                    e.isConfirmed &&
                        Swal.fire("Deleted!", "Your file has been deleted.", "success");
                });
        else if ("custom-html" == e)
            Swal.mixin({
                customClass: {
                    confirmButton: "btn bg-gradient-success",
                    cancelButton: "btn bg-gradient-danger",
                },
                buttonsStyling: !1,
            }).fire({
                title: "<strong>HTML <u>example</u></strong>",
                icon: "info",
                html: 'You can use <b>bold text</b>, <a href="//sweetalert2.github.io">links</a> and other HTML tags',
                showCloseButton: !0,
                showCancelButton: !0,
                focusConfirm: !1,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
                confirmButtonAriaLabel: "Thumbs up, great!",
                cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
                cancelButtonAriaLabel: "Thumbs down",
            });
        else if ("rtl-language" == e)
            Swal.mixin({
                customClass: {
                    confirmButton: "btn bg-gradient-success",
                    cancelButton: "btn bg-gradient-danger",
                },
                buttonsStyling: !1,
            }).fire({
                title: "هل تريد الاستمرار؟",
                icon: "question",
                iconHtml: "؟",
                confirmButtonText: "نعم",
                cancelButtonText: "لا",
                showCancelButton: !0,
                showCloseButton: !0,
            });
        else if ("auto-close" == e) {
            let e;
            Swal.fire({
                title: "Auto close alert!",
                html: "I will close in <b></b> milliseconds.",
                timer: 2e3,
                timerProgressBar: !0,
                didOpen: () => {
                    Swal.showLoading(),
                        (e = setInterval(() => {
                            var e = Swal.getHtmlContainer();
                            e &&
                                (e = e.querySelector("b")) &&
                                (e.textContent = Swal.getTimerLeft());
                        }, 100));
                },
                willClose: () => {
                    clearInterval(e);
                },
            }).then((e) => {
                e.dismiss, Swal.DismissReason.timer;
            });
        } else
            "input-field" == e &&
                Swal.mixin({
                    customClass: {
                        confirmButton: "btn bg-gradient-success",
                        cancelButton: "btn bg-gradient-danger",
                    },
                    buttonsStyling: !1,
                })
                    .fire({
                        title: "Submit your Github username",
                        input: "text",
                        inputAttributes: { autocapitalize: "off" },
                        showCancelButton: !0,
                        confirmButtonText: "Look up",
                        showLoaderOnConfirm: !0,
                        preConfirm: (e) =>
                            fetch("//api.github.com/users/" + e)
                                .then((e) => {
                                    if (e.ok) return e.json();
                                    throw new Error(e.statusText);
                                })
                                .catch((e) => {
                                    Swal.showValidationMessage("Request failed: " + e);
                                }),
                        allowOutsideClick: () => !Swal.isLoading(),
                    })
                    .then((e) => {
                        e.isConfirmed &&
                            Swal.fire({
                                title: e.value.login + "'s avatar",
                                imageUrl: e.value.avatar_url,
                            });
                    });
    },
};
//# sourceMappingURL=_site_dashboard_pro/assets/js/dashboard-pro.js.map
