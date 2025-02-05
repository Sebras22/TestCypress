import { sleep, group } from "k6";
import http from "k6/http";

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
            executor: "ramping-vus",
            gracefulStop: "30s",
            stages: [
                { target: 20, duration: "1m" },
                { target: 20, duration: "3m30s" },
                { target: 0, duration: "1m" },
            ],
            gracefulRampDown: "30s",
            exec: "scenario_1",
        },
        Imported_HAR: {
            executor: "per-vu-iterations",
            gracefulStop: "30s",
            vus: 80,
            iterations: 400,
            maxDuration: "1h",
            exec: "imported_HAR",
        },
    },
};

// Scenario: Scenario_1 (executor: ramping-vus)

export function scenario_1() {
    let response;

    group(
        "page_1 - https://crm.akov-formation.fr/datas/upload/fj/cv/r8/vsdkBRCemP.html",
        function () {
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
        }
    );
    sleep(0.2);
}

// Scenario: Imported_HAR (executor: per-vu-iterations)

export function imported_HAR() {
    let response;

    group(
        "page_1 - https://crm.akov-formation.fr/datas/upload/fj/cv/r8/vsdkBRCemP.html",
        function () {
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
        }
    );
    sleep(0.2);
}
