import { sleep, group } from "k6";
import http from "k6/http";
import browser from "k6/browser";

export const options = {
    cloud: {
        distribution: {
            "amazon:fr:paris": { loadZone: "amazon:fr:paris", percent: 100 },
        },
        apm: [],
    },
    thresholds: {},
    scenarios: {
        Scenario_1: {
            executor: "per-vu-iterations",
            gracefulStop: "30s",
            vus: 80,
            iterations: 400,
            maxDuration: "1h",
            exec: "scenario_1",
        },
    },
};

export function scenario_1() {
    let response;

    group("Load page", function () {
        response = http.get(
            "https://crm.akov-formation.fr/datas/upload/fj/cv/r8/vsdkBRCemP.html",
            {
                headers: {
                    dnt: "1",
                    "upgrade-insecure-requests": "1",
                    "sec-ch-ua":
                        '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": '"Windows"',
                },
            }
        );
    });
    sleep(0.2);
    group("Interact with task manager", function () {
        browser.visit(
            "https://crm.akov-formation.fr/datas/upload/fj/cv/r8/vsdkBRCemP.html",
            function () {
                browser.fill("#taskInput", "New Task");
                browser.click("button:contains('Ajouter')");
                sleep(1);
                browser.click("button:contains('Supprimer')");
            }
        );
    });
}
