export type TopicItemResponse = typeof topicItemResponse;
export type TopicPlaylistResponse = typeof topicPlaylistResponse;

const topicItemResponse = {
  response: {
    status: 200,
    statusText: "OK",
    data: [
      {
        page: "channel",
        rootVe: "3611",
      },
      {
        page: "channel",
        rootVe: "3611",
        response: {
          responseContext: {
            serviceTrackingParams: [
              {
                service: "GFEEDBACK",
                params: [
                  {
                    key: "route",
                    value: "channel.videos",
                  },
                  {
                    key: "is_casual",
                    value: "false",
                  },
                  {
                    key: "is_owner",
                    value: "false",
                  },
                  {
                    key: "is_monetization_enabled",
                    value: "false",
                  },
                  {
                    key: "num_shelves",
                    value: "2",
                  },
                  {
                    key: "is_alc_surface",
                    value: "false",
                  },
                  {
                    key: "browse_id",
                    value: "UCFpzduxWbxR1P7L-ynuAtTw",
                  },
                  {
                    key: "browse_id_prefix",
                    value: "",
                  },
                  {
                    key: "logged_in",
                    value: "0",
                  },
                  {
                    key: "e",
                    value:
                      "9406001,23804281,23946420,23966208,23983296,23986027,23998056,24004644,24007246,24034168,24036948,24077241,24080738,24120820,24135310,24140247,24166867,24181174,24186126,24187377,24211178,24219713,24241378,24248956,24255165,24255543,24255545,24262346,24288664,24290971,24291857,24362099,24363511,24366065,24367579,24367823,24368310,24371398,24372103,24372110,24372361,24373162,24374315,24377909,24379041,24379065,24379133,24379354,24379529,24379542,24379960,24379971,24380264,24382551,24383022,24385508,24385612,24386796,24388706,24388716,24388731,24388750,24388757,24389132,24390675,24391689,24401013,24404640,24407191,24407446,24415864,24416290,24428788,24428940,24437577,24439361,24440132,24451319,24453989,24457384,24458317,24458324,24458329,24458839,24459435,24463873,24466371,24466622,24468724,24469818,24485421,24495060,24498300,24501184,24501975,24503257,24505035,24506625,24506698,24506784,24506786,24507808,24508466,24509768,24515366,24515423,24518452,24519102,24520976,24523472,24525184,24526574,24526644,24526770,24526783,24526790,24526801,24526804,24526813,24526825,24527450,24528357,24528461,24528468,24528475,24528482,24528550,24528555,24528573,24528580,24528644,24528647,24528661,24528666,24528734,24532494,24537200,24541566,24541826,24541859,24542120,24542148,24542366,24542452,24542649,24543667,24544107,24544702,24544745,24547476,24547927,24547934,24547939,24548138,24550285,24550458,24550951,24551130,24552606,24552800,24553434,24553549,24554039,24650811,24691334,24695884,24698378,24698452,24698880,24699598,24699899,39324156,39324224,39324317,39324321,39324328,39324338,39324385,39324479,39324499,39324563,51000316,51001347,51001773",
                  },
                ],
              },
              {
                service: "GOOGLE_HELP",
                params: [
                  {
                    key: "browse_id",
                    value: "UCFpzduxWbxR1P7L-ynuAtTw",
                  },
                  {
                    key: "browse_id_prefix",
                    value: "",
                  },
                ],
              },
              {
                service: "CSI",
                params: [
                  {
                    key: "c",
                    value: "WEB",
                  },
                  {
                    key: "cver",
                    value: "2.20201021.03.00",
                  },
                  {
                    key: "yt_li",
                    value: "0",
                  },
                  {
                    key: "GetChannelPage_rid",
                    value: "0x171e15e05079cfd6",
                  },
                ],
              },
              {
                service: "GUIDED_HELP",
                params: [
                  {
                    key: "logged_in",
                    value: "0",
                  },
                ],
              },
              {
                service: "ECATCHER",
                params: [
                  {
                    key: "client.version",
                    value: "2.20221122",
                  },
                  {
                    key: "client.name",
                    value: "WEB",
                  },
                  {
                    key: "client.fexp",
                    value:
                      "24288664,24290971,24547934,24699598,24007246,39324385,24542649,24388731,24466622,23986027,24526644,24363511,24140247,24255543,24262346,24379041,24440132,24547927,24528550,24527450,24379133,24525184,24379960,24458324,24367579,51001347,24501975,24372361,24523472,24379529,39324328,24506698,39324479,24498300,24453989,24367823,24428788,23998056,24501184,24552800,24552606,24401013,39324321,24506784,24528573,24528357,24385508,24526804,24077241,24187377,24508466,24519102,24371398,24528580,24036948,24458839,24550285,51001773,24389132,24186126,24698880,24526574,24372103,24544107,24526790,24553549,24372110,24004644,24241378,24526783,24506625,24509768,39324563,24255545,24553434,24528644,24255165,24698378,24120820,24532494,24463873,24380264,24542366,24554039,24386796,24505035,24528666,24526825,24388716,24547939,24542452,24458329,24382551,24543667,24550458,39324499,24362099,24407191,24415864,24248956,24526813,24541826,24528661,24544745,24181174,24388706,39324317,24469818,24526770,24457384,24135310,24650811,23966208,24080738,24542120,39324338,24544702,24379354,24528647,24495060,24404640,24691334,24548138,24515366,24459435,24388757,39324224,24034168,9406001,24541566,51000316,24388750,24379971,24373162,24379065,24515423,24366065,24503257,24542148,24219713,24166867,24291857,24468724,24379542,24416290,24368310,24507808,24211178,23983296,24528555,24439361,24374315,24547476,24458317,24437577,24698452,23804281,39324156,24428940,24385612,24526801,24541859,24485421,24699899,24466371,24528734,24528482,24518452,24550951,24391689,24390675,24520976,24537200,24528475,24451319,24695884,23946420,24407446,24528468,24528461,24377909,24551130,24506786,24383022",
                  },
                ],
              },
            ],
            maxAgeSeconds: 300,
            mainAppWebResponseContext: {
              loggedOut: true,
              trackingParam:
                "kx_fmPxhoPZRfjNOc4CvscRCwhsEQOtTsLqMU7kCAyCOE9wRgkuswmIBwOcCE59TDtslLKPQ-SS",
            },
            webResponseContextExtensionData: {
              ytConfigData: {
                visitorData: "CgtLMmlPR21LVlFIZyiqxqOmBg%3D%3D",
                rootVisualElementType: 3611,
              },
              hasDecorated: true,
            },
          },
          contents: {
            twoColumnBrowseResultsRenderer: {
              tabs: [
                {
                  tabRenderer: {
                    endpoint: {
                      clickTrackingParams:
                        "CBIQ8JMBGAUiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                      commandMetadata: {
                        webCommandMetadata: {
                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw/featured",
                          webPageType: "WEB_PAGE_TYPE_CHANNEL",
                          rootVe: 3611,
                          apiUrl: "/youtubei/v1/browse",
                        },
                      },
                      browseEndpoint: {
                        browseId: "UCFpzduxWbxR1P7L-ynuAtTw",
                        params: "EghmZWF0dXJlZPIGBAoCMgA%3D",
                        canonicalBaseUrl: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                      },
                    },
                    title: "Home",
                    selected: true,
                    content: {
                      sectionListRenderer: {
                        contents: [
                          {
                            itemSectionRenderer: {
                              contents: [
                                {
                                  shelfRenderer: {
                                    title: {
                                      runs: [
                                        {
                                          text: "Albums & Singles",
                                          navigationEndpoint: {
                                            clickTrackingParams:
                                              "CBUQ3BwYACITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                            commandMetadata: {
                                              webCommandMetadata: {
                                                url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw/playlists?view=50&sort=dd&shelf_id=17666223384013636041",
                                                webPageType:
                                                  "WEB_PAGE_TYPE_CHANNEL",
                                                rootVe: 3611,
                                                apiUrl: "/youtubei/v1/browse",
                                              },
                                            },
                                            browseEndpoint: {
                                              browseId:
                                                "UCFpzduxWbxR1P7L-ynuAtTw",
                                              params:
                                                "EglwbGF5bGlzdHMYAyAycMmD1PaWksKV9QHyBgkKB0IAogECCAE%3D",
                                              canonicalBaseUrl:
                                                "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                            },
                                          },
                                        },
                                      ],
                                    },
                                    endpoint: {
                                      clickTrackingParams:
                                        "CBUQ3BwYACITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                      commandMetadata: {
                                        webCommandMetadata: {
                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw/playlists?view=50&sort=dd&shelf_id=17666223384013636041",
                                          webPageType: "WEB_PAGE_TYPE_CHANNEL",
                                          rootVe: 3611,
                                          apiUrl: "/youtubei/v1/browse",
                                        },
                                      },
                                      browseEndpoint: {
                                        browseId: "UCFpzduxWbxR1P7L-ynuAtTw",
                                        params:
                                          "EglwbGF5bGlzdHMYAyAycMmD1PaWksKV9QHyBgkKB0IAogECCAE%3D",
                                        canonicalBaseUrl:
                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                      },
                                    },
                                    content: {
                                      horizontalListRenderer: {
                                        items: [
                                          {
                                            gridPlaylistRenderer: {
                                              playlistId:
                                                "OLAK5uy_nzqa3XBbwL-0oCDYjum2w38dAldxfnI8E",
                                              thumbnail: {
                                                thumbnails: [
                                                  {
                                                    url: "https://i.ytimg.com/vi/rdRnbxviZmU/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDG_5BQ25pRxGFnhbn1bCx1x_RFxQ",
                                                    width: 480,
                                                    height: 270,
                                                  },
                                                ],
                                                sampledThumbnailColor: {
                                                  red: 59,
                                                  green: 77,
                                                  blue: 89,
                                                },
                                                darkColorPalette: {
                                                  section2Color: 2239539,
                                                  iconInactiveColor: 7768211,
                                                },
                                                vibrantColorPalette: {
                                                  iconInactiveColor: 7047065,
                                                },
                                              },
                                              title: {
                                                runs: [
                                                  {
                                                    text: "Nuages de Jazz ...",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CB0QljUYACITCLfAkOKku4ADFShYegUd0Y4KETIGZy1oaWdoWhhVQ0ZwemR1eFdieFIxUDdMLXludUF0VHeaAQYQ8jgYlwE=",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/watch?v=rdRnbxviZmU&list=OLAK5uy_nzqa3XBbwL-0oCDYjum2w38dAldxfnI8E",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_WATCH",
                                                          rootVe: 3832,
                                                        },
                                                      },
                                                      watchEndpoint: {
                                                        videoId: "rdRnbxviZmU",
                                                        playlistId:
                                                          "OLAK5uy_nzqa3XBbwL-0oCDYjum2w38dAldxfnI8E",
                                                        params: "OAI%3D",
                                                        loggingContext: {
                                                          vssLoggingContext: {
                                                            serializedContextData:
                                                              "GilPTEFLNXV5X256cWEzWEJid0wtMG9DRFlqdW0ydzM4ZEFsZHhmbkk4RQ%3D%3D",
                                                          },
                                                        },
                                                        watchEndpointSupportedOnesieConfig:
                                                          {
                                                            html5PlaybackOnesieConfig:
                                                              {
                                                                commonConfig: {
                                                                  url: "https://rr2---sn-uxaxh5ji-15be.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=add4676f1be26665&ip=86.33.65.170&initcwndbps=636250&mt=1690886487&oweuc=",
                                                                },
                                                              },
                                                          },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                              shortBylineText: {
                                                runs: [
                                                  {
                                                    text: "Olivier Kirsch, ",
                                                  },
                                                  {
                                                    text: "Dorado Schmitt",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CB0QljUYACITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCFpzduxWbxR1P7L-ynuAtTw",
                                                        canonicalBaseUrl:
                                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                      },
                                                    },
                                                  },
                                                  {
                                                    text: ", ",
                                                  },
                                                  {
                                                    text: "Bireli Lagréne",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CB0QljUYACITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCKVaRJq26O_yOBq3sFGEm6w",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCKVaRJq26O_yOBq3sFGEm6w",
                                                        canonicalBaseUrl:
                                                          "/channel/UCKVaRJq26O_yOBq3sFGEm6w",
                                                      },
                                                    },
                                                  },
                                                  {
                                                    text: " · ",
                                                  },
                                                  {
                                                    text: "Album",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CB0QljUYACITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCKVaRJq26O_yOBq3sFGEm6w",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCKVaRJq26O_yOBq3sFGEm6w",
                                                        canonicalBaseUrl:
                                                          "/channel/UCKVaRJq26O_yOBq3sFGEm6w",
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                              videoCountText: {
                                                runs: [
                                                  {
                                                    text: "13",
                                                  },
                                                  {
                                                    text: " videos",
                                                  },
                                                ],
                                              },
                                              navigationEndpoint: {
                                                clickTrackingParams:
                                                  "CB0QljUYACITCLfAkOKku4ADFShYegUd0Y4KETIGZy1oaWdoWhhVQ0ZwemR1eFdieFIxUDdMLXludUF0VHeaAQYQ8jgYlwE=",
                                                commandMetadata: {
                                                  webCommandMetadata: {
                                                    url: "/watch?v=rdRnbxviZmU&list=OLAK5uy_nzqa3XBbwL-0oCDYjum2w38dAldxfnI8E",
                                                    webPageType:
                                                      "WEB_PAGE_TYPE_WATCH",
                                                    rootVe: 3832,
                                                  },
                                                },
                                                watchEndpoint: {
                                                  videoId: "rdRnbxviZmU",
                                                  playlistId:
                                                    "OLAK5uy_nzqa3XBbwL-0oCDYjum2w38dAldxfnI8E",
                                                  params: "OAI%3D",
                                                  loggingContext: {
                                                    vssLoggingContext: {
                                                      serializedContextData:
                                                        "GilPTEFLNXV5X256cWEzWEJid0wtMG9DRFlqdW0ydzM4ZEFsZHhmbkk4RQ%3D%3D",
                                                    },
                                                  },
                                                  watchEndpointSupportedOnesieConfig:
                                                    {
                                                      html5PlaybackOnesieConfig:
                                                        {
                                                          commonConfig: {
                                                            url: "https://rr2---sn-uxaxh5ji-15be.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=add4676f1be26665&ip=86.33.65.170&initcwndbps=636250&mt=1690886487&oweuc=",
                                                          },
                                                        },
                                                    },
                                                },
                                              },
                                              publishedTimeText: {
                                                simpleText: "Updated today",
                                              },
                                              videoCountShortText: {
                                                simpleText: "13",
                                              },
                                              trackingParams:
                                                "CB0QljUYACITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                              sidebarThumbnails: [
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/KH4VdcSaaa4/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/g_I1MZ8KLi8/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/qUtFFvlC06M/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/jro3QDh5gcY/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                              ],
                                              thumbnailText: {
                                                runs: [
                                                  {
                                                    text: "13",
                                                    bold: true,
                                                  },
                                                  {
                                                    text: " videos",
                                                  },
                                                ],
                                              },
                                              thumbnailRenderer: {
                                                playlistCustomThumbnailRenderer:
                                                  {
                                                    thumbnail: {
                                                      thumbnails: [
                                                        {
                                                          url: "https://i9.ytimg.com/s_p/OLAK5uy_nzqa3XBbwL-0oCDYjum2w38dAldxfnI8E/mqdefault.jpg?sqp=CKzEo6YGir7X7AMGCP3yoKYG&rs=AOn4CLDYoy0QoIgsm8aA0US0eOYm-G12Mg&v=1690843517",
                                                          width: 180,
                                                          height: 180,
                                                        },
                                                        {
                                                          url: "https://i9.ytimg.com/s_p/OLAK5uy_nzqa3XBbwL-0oCDYjum2w38dAldxfnI8E/sddefault.jpg?sqp=CKzEo6YGir7X7AMGCP3yoKYG&rs=AOn4CLAQCqebDyPFTQipAspm6ygy6Q1e8w&v=1690843517",
                                                          width: 640,
                                                          height: 640,
                                                        },
                                                        {
                                                          url: "https://i9.ytimg.com/s_p/OLAK5uy_nzqa3XBbwL-0oCDYjum2w38dAldxfnI8E/maxresdefault.jpg?sqp=CKzEo6YGir7X7AMGCP3yoKYG&rs=AOn4CLBbHdQlmxZPauv2Y587itB4Tir1-A&v=1690843517",
                                                          width: 1200,
                                                          height: 1200,
                                                        },
                                                      ],
                                                      sampledThumbnailColor: {
                                                        red: 59,
                                                        green: 77,
                                                        blue: 89,
                                                      },
                                                      darkColorPalette: {
                                                        section2Color: 2239539,
                                                        iconInactiveColor: 7768211,
                                                      },
                                                      vibrantColorPalette: {
                                                        iconInactiveColor: 7047065,
                                                      },
                                                    },
                                                  },
                                              },
                                              longBylineText: {
                                                runs: [
                                                  {
                                                    text: "Olivier Kirsch, ",
                                                  },
                                                  {
                                                    text: "Dorado Schmitt",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CB0QljUYACITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCFpzduxWbxR1P7L-ynuAtTw",
                                                        canonicalBaseUrl:
                                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                      },
                                                    },
                                                  },
                                                  {
                                                    text: ", ",
                                                  },
                                                  {
                                                    text: "Bireli Lagréne",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CB0QljUYACITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCKVaRJq26O_yOBq3sFGEm6w",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCKVaRJq26O_yOBq3sFGEm6w",
                                                        canonicalBaseUrl:
                                                          "/channel/UCKVaRJq26O_yOBq3sFGEm6w",
                                                      },
                                                    },
                                                  },
                                                  {
                                                    text: " · ",
                                                  },
                                                  {
                                                    text: "Album",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CB0QljUYACITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCKVaRJq26O_yOBq3sFGEm6w",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCKVaRJq26O_yOBq3sFGEm6w",
                                                        canonicalBaseUrl:
                                                          "/channel/UCKVaRJq26O_yOBq3sFGEm6w",
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                              thumbnailOverlays: [
                                                {
                                                  thumbnailOverlayBottomPanelRenderer:
                                                    {
                                                      text: {
                                                        simpleText: "13 songs",
                                                      },
                                                      icon: {
                                                        iconType: "MUSIC",
                                                      },
                                                    },
                                                },
                                                {
                                                  thumbnailOverlayHoverTextRenderer:
                                                    {
                                                      text: {
                                                        runs: [
                                                          {
                                                            text: "Play all",
                                                          },
                                                        ],
                                                      },
                                                      icon: {
                                                        iconType: "PLAY_ALL",
                                                      },
                                                    },
                                                },
                                                {
                                                  thumbnailOverlayNowPlayingRenderer:
                                                    {
                                                      text: {
                                                        runs: [
                                                          {
                                                            text: "Now playing",
                                                          },
                                                        ],
                                                      },
                                                    },
                                                },
                                              ],
                                              viewPlaylistText: {
                                                runs: [
                                                  {
                                                    text: "View full playlist",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CB0QljUYACITCLfAkOKku4ADFShYegUd0Y4KETIGZy1oaWdo",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/playlist?list=OLAK5uy_nzqa3XBbwL-0oCDYjum2w38dAldxfnI8E",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_PLAYLIST",
                                                          rootVe: 5754,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "VLOLAK5uy_nzqa3XBbwL-0oCDYjum2w38dAldxfnI8E",
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            },
                                          },
                                          {
                                            gridPlaylistRenderer: {
                                              playlistId:
                                                "OLAK5uy_mTLqe5120l_eisPDYSuQbzEsYX7c42yiA",
                                              thumbnail: {
                                                thumbnails: [
                                                  {
                                                    url: "https://i.ytimg.com/vi/ddaGU8lD3nQ/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDOY-tRHbpggzm_r_3sRdIhCXl_3w",
                                                    width: 480,
                                                    height: 270,
                                                  },
                                                ],
                                                sampledThumbnailColor: {
                                                  red: 101,
                                                  green: 65,
                                                  blue: 54,
                                                },
                                                darkColorPalette: {
                                                  section2Color: 3350555,
                                                  iconInactiveColor: 9665910,
                                                },
                                                vibrantColorPalette: {
                                                  iconInactiveColor: 10057067,
                                                },
                                              },
                                              title: {
                                                runs: [
                                                  {
                                                    text: "Jazz Band : entre plusieurs couleurs",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBwQljUYASITCLfAkOKku4ADFShYegUd0Y4KETIGZy1oaWdoWhhVQ0ZwemR1eFdieFIxUDdMLXludUF0VHeaAQYQ8jgYlwE=",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/watch?v=ddaGU8lD3nQ&list=OLAK5uy_mTLqe5120l_eisPDYSuQbzEsYX7c42yiA",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_WATCH",
                                                          rootVe: 3832,
                                                        },
                                                      },
                                                      watchEndpoint: {
                                                        videoId: "ddaGU8lD3nQ",
                                                        playlistId:
                                                          "OLAK5uy_mTLqe5120l_eisPDYSuQbzEsYX7c42yiA",
                                                        params: "OAI%3D",
                                                        loggingContext: {
                                                          vssLoggingContext: {
                                                            serializedContextData:
                                                              "GilPTEFLNXV5X21UTHFlNTEyMGxfZWlzUERZU3VRYnpFc1lYN2M0MnlpQQ%3D%3D",
                                                          },
                                                        },
                                                        watchEndpointSupportedOnesieConfig:
                                                          {
                                                            html5PlaybackOnesieConfig:
                                                              {
                                                                commonConfig: {
                                                                  url: "https://rr2---sn-uxaxh5ji-15be.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=75d68653c943de74&ip=86.33.65.170&initcwndbps=636250&mt=1690886487&oweuc=",
                                                                },
                                                              },
                                                          },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                              shortBylineText: {
                                                runs: [
                                                  {
                                                    text: "Dorado Schmitt",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBwQljUYASITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCFpzduxWbxR1P7L-ynuAtTw",
                                                        canonicalBaseUrl:
                                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                      },
                                                    },
                                                  },
                                                  {
                                                    text: " · ",
                                                  },
                                                  {
                                                    text: "Album",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBwQljUYASITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCFpzduxWbxR1P7L-ynuAtTw",
                                                        canonicalBaseUrl:
                                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                              videoCountText: {
                                                runs: [
                                                  {
                                                    text: "13",
                                                  },
                                                  {
                                                    text: " videos",
                                                  },
                                                ],
                                              },
                                              navigationEndpoint: {
                                                clickTrackingParams:
                                                  "CBwQljUYASITCLfAkOKku4ADFShYegUd0Y4KETIGZy1oaWdoWhhVQ0ZwemR1eFdieFIxUDdMLXludUF0VHeaAQYQ8jgYlwE=",
                                                commandMetadata: {
                                                  webCommandMetadata: {
                                                    url: "/watch?v=ddaGU8lD3nQ&list=OLAK5uy_mTLqe5120l_eisPDYSuQbzEsYX7c42yiA",
                                                    webPageType:
                                                      "WEB_PAGE_TYPE_WATCH",
                                                    rootVe: 3832,
                                                  },
                                                },
                                                watchEndpoint: {
                                                  videoId: "ddaGU8lD3nQ",
                                                  playlistId:
                                                    "OLAK5uy_mTLqe5120l_eisPDYSuQbzEsYX7c42yiA",
                                                  params: "OAI%3D",
                                                  loggingContext: {
                                                    vssLoggingContext: {
                                                      serializedContextData:
                                                        "GilPTEFLNXV5X21UTHFlNTEyMGxfZWlzUERZU3VRYnpFc1lYN2M0MnlpQQ%3D%3D",
                                                    },
                                                  },
                                                  watchEndpointSupportedOnesieConfig:
                                                    {
                                                      html5PlaybackOnesieConfig:
                                                        {
                                                          commonConfig: {
                                                            url: "https://rr2---sn-uxaxh5ji-15be.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=75d68653c943de74&ip=86.33.65.170&initcwndbps=636250&mt=1690886487&oweuc=",
                                                          },
                                                        },
                                                    },
                                                },
                                              },
                                              publishedTimeText: {
                                                simpleText:
                                                  "Updated 6 days ago",
                                              },
                                              videoCountShortText: {
                                                simpleText: "13",
                                              },
                                              trackingParams:
                                                "CBwQljUYASITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                              sidebarThumbnails: [
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/9FNCMou9AJI/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/x4VqO_j5dBE/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/r2xNawlOqWg/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/0D-aqUUaKQo/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                              ],
                                              thumbnailText: {
                                                runs: [
                                                  {
                                                    text: "13",
                                                    bold: true,
                                                  },
                                                  {
                                                    text: " videos",
                                                  },
                                                ],
                                              },
                                              thumbnailRenderer: {
                                                playlistCustomThumbnailRenderer:
                                                  {
                                                    thumbnail: {
                                                      thumbnails: [
                                                        {
                                                          url: "https://i9.ytimg.com/s_p/OLAK5uy_mTLqe5120l_eisPDYSuQbzEsYX7c42yiA/mqdefault.jpg?sqp=CKzEo6YGir7X7AMGCMT8_qUG&rs=AOn4CLCSB7QpfyG85IVuEg2In2VjEIbVfQ&v=1690287684",
                                                          width: 180,
                                                          height: 180,
                                                        },
                                                        {
                                                          url: "https://i9.ytimg.com/s_p/OLAK5uy_mTLqe5120l_eisPDYSuQbzEsYX7c42yiA/sddefault.jpg?sqp=CKzEo6YGir7X7AMGCMT8_qUG&rs=AOn4CLCbS5eo0VTv6VCY1APdOO6TjTKfMg&v=1690287684",
                                                          width: 640,
                                                          height: 640,
                                                        },
                                                        {
                                                          url: "https://i9.ytimg.com/s_p/OLAK5uy_mTLqe5120l_eisPDYSuQbzEsYX7c42yiA/maxresdefault.jpg?sqp=CKzEo6YGir7X7AMGCMT8_qUG&rs=AOn4CLAfJyC3gaLt5QLpNyjG18odiuf3Ig&v=1690287684",
                                                          width: 1200,
                                                          height: 1200,
                                                        },
                                                      ],
                                                      sampledThumbnailColor: {
                                                        red: 101,
                                                        green: 65,
                                                        blue: 54,
                                                      },
                                                      darkColorPalette: {
                                                        section2Color: 3350555,
                                                        iconInactiveColor: 9665910,
                                                      },
                                                      vibrantColorPalette: {
                                                        iconInactiveColor: 10057067,
                                                      },
                                                    },
                                                  },
                                              },
                                              longBylineText: {
                                                runs: [
                                                  {
                                                    text: "Dorado Schmitt",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBwQljUYASITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCFpzduxWbxR1P7L-ynuAtTw",
                                                        canonicalBaseUrl:
                                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                      },
                                                    },
                                                  },
                                                  {
                                                    text: " · ",
                                                  },
                                                  {
                                                    text: "Album",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBwQljUYASITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCFpzduxWbxR1P7L-ynuAtTw",
                                                        canonicalBaseUrl:
                                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                              thumbnailOverlays: [
                                                {
                                                  thumbnailOverlayBottomPanelRenderer:
                                                    {
                                                      text: {
                                                        simpleText: "13 songs",
                                                      },
                                                      icon: {
                                                        iconType: "MUSIC",
                                                      },
                                                    },
                                                },
                                                {
                                                  thumbnailOverlayHoverTextRenderer:
                                                    {
                                                      text: {
                                                        runs: [
                                                          {
                                                            text: "Play all",
                                                          },
                                                        ],
                                                      },
                                                      icon: {
                                                        iconType: "PLAY_ALL",
                                                      },
                                                    },
                                                },
                                                {
                                                  thumbnailOverlayNowPlayingRenderer:
                                                    {
                                                      text: {
                                                        runs: [
                                                          {
                                                            text: "Now playing",
                                                          },
                                                        ],
                                                      },
                                                    },
                                                },
                                              ],
                                              viewPlaylistText: {
                                                runs: [
                                                  {
                                                    text: "View full playlist",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBwQljUYASITCLfAkOKku4ADFShYegUd0Y4KETIGZy1oaWdo",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/playlist?list=OLAK5uy_mTLqe5120l_eisPDYSuQbzEsYX7c42yiA",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_PLAYLIST",
                                                          rootVe: 5754,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "VLOLAK5uy_mTLqe5120l_eisPDYSuQbzEsYX7c42yiA",
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            },
                                          },
                                          {
                                            gridPlaylistRenderer: {
                                              playlistId:
                                                "OLAK5uy_mT7_AiZNTJWvTVlYJTic1nfEx50BC-c4w",
                                              thumbnail: {
                                                thumbnails: [
                                                  {
                                                    url: "https://i.ytimg.com/vi/ErPP3valmPM/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAp22WNLMmT9zSunEB_bSLTQGZm2w",
                                                    width: 480,
                                                    height: 270,
                                                  },
                                                ],
                                                sampledThumbnailColor: {
                                                  red: 114,
                                                  green: 36,
                                                  blue: 17,
                                                },
                                                darkColorPalette: {
                                                  section2Color: 3346439,
                                                  iconInactiveColor: 9665654,
                                                },
                                                vibrantColorPalette: {
                                                  iconInactiveColor: 10056811,
                                                },
                                              },
                                              title: {
                                                runs: [
                                                  {
                                                    text: "The Django Reinhardt Festival - Gypsy Swing!",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBsQljUYAiITCLfAkOKku4ADFShYegUd0Y4KETIGZy1oaWdoWhhVQ0ZwemR1eFdieFIxUDdMLXludUF0VHeaAQYQ8jgYlwE=",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/watch?v=ErPP3valmPM&list=OLAK5uy_mT7_AiZNTJWvTVlYJTic1nfEx50BC-c4w",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_WATCH",
                                                          rootVe: 3832,
                                                        },
                                                      },
                                                      watchEndpoint: {
                                                        videoId: "ErPP3valmPM",
                                                        playlistId:
                                                          "OLAK5uy_mT7_AiZNTJWvTVlYJTic1nfEx50BC-c4w",
                                                        params: "OAI%3D",
                                                        loggingContext: {
                                                          vssLoggingContext: {
                                                            serializedContextData:
                                                              "GilPTEFLNXV5X21UN19BaVpOVEpXdlRWbFlKVGljMW5mRXg1MEJDLWM0dw%3D%3D",
                                                          },
                                                        },
                                                        watchEndpointSupportedOnesieConfig:
                                                          {
                                                            html5PlaybackOnesieConfig:
                                                              {
                                                                commonConfig: {
                                                                  url: "https://rr1---sn-uxaxh5ji-15be.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=12b3cfdef6a598f3&ip=86.33.65.170&initcwndbps=636250&mt=1690886487&oweuc=",
                                                                },
                                                              },
                                                          },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                              shortBylineText: {
                                                runs: [
                                                  {
                                                    text: "Dorado Schmitt",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBsQljUYAiITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCFpzduxWbxR1P7L-ynuAtTw",
                                                        canonicalBaseUrl:
                                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                      },
                                                    },
                                                  },
                                                  {
                                                    text: ", ",
                                                  },
                                                  {
                                                    text: "Babik Reinhardt",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBsQljUYAiITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCtWx7GIv80asWDl3vW7LAtg",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCtWx7GIv80asWDl3vW7LAtg",
                                                        canonicalBaseUrl:
                                                          "/channel/UCtWx7GIv80asWDl3vW7LAtg",
                                                      },
                                                    },
                                                  },
                                                  {
                                                    text: ", ",
                                                  },
                                                  {
                                                    text: "Angelo Debarre",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBsQljUYAiITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCVQchlgNCo1V6Mj2ZQrQvLQ",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCVQchlgNCo1V6Mj2ZQrQvLQ",
                                                        canonicalBaseUrl:
                                                          "/channel/UCVQchlgNCo1V6Mj2ZQrQvLQ",
                                                      },
                                                    },
                                                  },
                                                  {
                                                    text: " · ",
                                                  },
                                                  {
                                                    text: "Album",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBsQljUYAiITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCVQchlgNCo1V6Mj2ZQrQvLQ",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCVQchlgNCo1V6Mj2ZQrQvLQ",
                                                        canonicalBaseUrl:
                                                          "/channel/UCVQchlgNCo1V6Mj2ZQrQvLQ",
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                              videoCountText: {
                                                runs: [
                                                  {
                                                    text: "12",
                                                  },
                                                  {
                                                    text: " videos",
                                                  },
                                                ],
                                              },
                                              navigationEndpoint: {
                                                clickTrackingParams:
                                                  "CBsQljUYAiITCLfAkOKku4ADFShYegUd0Y4KETIGZy1oaWdoWhhVQ0ZwemR1eFdieFIxUDdMLXludUF0VHeaAQYQ8jgYlwE=",
                                                commandMetadata: {
                                                  webCommandMetadata: {
                                                    url: "/watch?v=ErPP3valmPM&list=OLAK5uy_mT7_AiZNTJWvTVlYJTic1nfEx50BC-c4w",
                                                    webPageType:
                                                      "WEB_PAGE_TYPE_WATCH",
                                                    rootVe: 3832,
                                                  },
                                                },
                                                watchEndpoint: {
                                                  videoId: "ErPP3valmPM",
                                                  playlistId:
                                                    "OLAK5uy_mT7_AiZNTJWvTVlYJTic1nfEx50BC-c4w",
                                                  params: "OAI%3D",
                                                  loggingContext: {
                                                    vssLoggingContext: {
                                                      serializedContextData:
                                                        "GilPTEFLNXV5X21UN19BaVpOVEpXdlRWbFlKVGljMW5mRXg1MEJDLWM0dw%3D%3D",
                                                    },
                                                  },
                                                  watchEndpointSupportedOnesieConfig:
                                                    {
                                                      html5PlaybackOnesieConfig:
                                                        {
                                                          commonConfig: {
                                                            url: "https://rr1---sn-uxaxh5ji-15be.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=12b3cfdef6a598f3&ip=86.33.65.170&initcwndbps=636250&mt=1690886487&oweuc=",
                                                          },
                                                        },
                                                    },
                                                },
                                              },
                                              publishedTimeText: {
                                                simpleText:
                                                  "Updated 2 days ago",
                                              },
                                              videoCountShortText: {
                                                simpleText: "12",
                                              },
                                              trackingParams:
                                                "CBsQljUYAiITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                              sidebarThumbnails: [
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/O2yQEPv49Ak/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/QwYvqfy40fI/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/JQ84NLjqHEE/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/p1lWc8sEOFQ/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                              ],
                                              thumbnailText: {
                                                runs: [
                                                  {
                                                    text: "12",
                                                    bold: true,
                                                  },
                                                  {
                                                    text: " videos",
                                                  },
                                                ],
                                              },
                                              thumbnailRenderer: {
                                                playlistCustomThumbnailRenderer:
                                                  {
                                                    thumbnail: {
                                                      thumbnails: [
                                                        {
                                                          url: "https://i9.ytimg.com/s_p/OLAK5uy_mT7_AiZNTJWvTVlYJTic1nfEx50BC-c4w/mqdefault.jpg?sqp=CKzEo6YGir7X7AMGCI3ilaYG&rs=AOn4CLAbU1AHicl1upU7GvA3RY5vcpvNOw&v=1690661133",
                                                          width: 180,
                                                          height: 180,
                                                        },
                                                        {
                                                          url: "https://i9.ytimg.com/s_p/OLAK5uy_mT7_AiZNTJWvTVlYJTic1nfEx50BC-c4w/sddefault.jpg?sqp=CKzEo6YGir7X7AMGCI3ilaYG&rs=AOn4CLD0o2fJEJy8MHzRBztbL-4JKTL4SA&v=1690661133",
                                                          width: 640,
                                                          height: 640,
                                                        },
                                                        {
                                                          url: "https://i9.ytimg.com/s_p/OLAK5uy_mT7_AiZNTJWvTVlYJTic1nfEx50BC-c4w/maxresdefault.jpg?sqp=CKzEo6YGir7X7AMGCI3ilaYG&rs=AOn4CLA1qpfy_js-OPDq7nMIZ53Py8vP6w&v=1690661133",
                                                          width: 1200,
                                                          height: 1200,
                                                        },
                                                      ],
                                                      sampledThumbnailColor: {
                                                        red: 114,
                                                        green: 36,
                                                        blue: 17,
                                                      },
                                                      darkColorPalette: {
                                                        section2Color: 3346439,
                                                        iconInactiveColor: 9665654,
                                                      },
                                                      vibrantColorPalette: {
                                                        iconInactiveColor: 10056811,
                                                      },
                                                    },
                                                  },
                                              },
                                              longBylineText: {
                                                runs: [
                                                  {
                                                    text: "Dorado Schmitt",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBsQljUYAiITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCFpzduxWbxR1P7L-ynuAtTw",
                                                        canonicalBaseUrl:
                                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                      },
                                                    },
                                                  },
                                                  {
                                                    text: ", ",
                                                  },
                                                  {
                                                    text: "Babik Reinhardt",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBsQljUYAiITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCtWx7GIv80asWDl3vW7LAtg",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCtWx7GIv80asWDl3vW7LAtg",
                                                        canonicalBaseUrl:
                                                          "/channel/UCtWx7GIv80asWDl3vW7LAtg",
                                                      },
                                                    },
                                                  },
                                                  {
                                                    text: ", ",
                                                  },
                                                  {
                                                    text: "Angelo Debarre",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBsQljUYAiITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCVQchlgNCo1V6Mj2ZQrQvLQ",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCVQchlgNCo1V6Mj2ZQrQvLQ",
                                                        canonicalBaseUrl:
                                                          "/channel/UCVQchlgNCo1V6Mj2ZQrQvLQ",
                                                      },
                                                    },
                                                  },
                                                  {
                                                    text: " · ",
                                                  },
                                                  {
                                                    text: "Album",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBsQljUYAiITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCVQchlgNCo1V6Mj2ZQrQvLQ",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCVQchlgNCo1V6Mj2ZQrQvLQ",
                                                        canonicalBaseUrl:
                                                          "/channel/UCVQchlgNCo1V6Mj2ZQrQvLQ",
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                              thumbnailOverlays: [
                                                {
                                                  thumbnailOverlayBottomPanelRenderer:
                                                    {
                                                      text: {
                                                        simpleText: "12 songs",
                                                      },
                                                      icon: {
                                                        iconType: "MUSIC",
                                                      },
                                                    },
                                                },
                                                {
                                                  thumbnailOverlayHoverTextRenderer:
                                                    {
                                                      text: {
                                                        runs: [
                                                          {
                                                            text: "Play all",
                                                          },
                                                        ],
                                                      },
                                                      icon: {
                                                        iconType: "PLAY_ALL",
                                                      },
                                                    },
                                                },
                                                {
                                                  thumbnailOverlayNowPlayingRenderer:
                                                    {
                                                      text: {
                                                        runs: [
                                                          {
                                                            text: "Now playing",
                                                          },
                                                        ],
                                                      },
                                                    },
                                                },
                                              ],
                                              viewPlaylistText: {
                                                runs: [
                                                  {
                                                    text: "View full playlist",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBsQljUYAiITCLfAkOKku4ADFShYegUd0Y4KETIGZy1oaWdo",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/playlist?list=OLAK5uy_mT7_AiZNTJWvTVlYJTic1nfEx50BC-c4w",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_PLAYLIST",
                                                          rootVe: 5754,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "VLOLAK5uy_mT7_AiZNTJWvTVlYJTic1nfEx50BC-c4w",
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            },
                                          },
                                          {
                                            gridPlaylistRenderer: {
                                              playlistId:
                                                "OLAK5uy_kx5r69bxcmu3o1wxTkDkAxsZMEb_jibfc",
                                              thumbnail: {
                                                thumbnails: [
                                                  {
                                                    url: "https://i.ytimg.com/vi/uoVpIkc7OOo/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBJmgUBh1lNdjE__Cwq27MKTHRuPA",
                                                    width: 480,
                                                    height: 270,
                                                  },
                                                ],
                                                sampledThumbnailColor: {
                                                  red: 40,
                                                  green: 59,
                                                  blue: 114,
                                                },
                                                darkColorPalette: {
                                                  section2Color: 1186355,
                                                  iconInactiveColor: 7765395,
                                                },
                                                vibrantColorPalette: {
                                                  iconInactiveColor: 7042713,
                                                },
                                              },
                                              title: {
                                                runs: [
                                                  {
                                                    text: "Parisienne",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBoQljUYAyITCLfAkOKku4ADFShYegUd0Y4KETIGZy1oaWdoWhhVQ0ZwemR1eFdieFIxUDdMLXludUF0VHeaAQYQ8jgYlwE=",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/watch?v=uoVpIkc7OOo&list=OLAK5uy_kx5r69bxcmu3o1wxTkDkAxsZMEb_jibfc",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_WATCH",
                                                          rootVe: 3832,
                                                        },
                                                      },
                                                      watchEndpoint: {
                                                        videoId: "uoVpIkc7OOo",
                                                        playlistId:
                                                          "OLAK5uy_kx5r69bxcmu3o1wxTkDkAxsZMEb_jibfc",
                                                        params: "OAI%3D",
                                                        loggingContext: {
                                                          vssLoggingContext: {
                                                            serializedContextData:
                                                              "GilPTEFLNXV5X2t4NXI2OWJ4Y211M28xd3hUa0RrQXhzWk1FYl9qaWJmYw%3D%3D",
                                                          },
                                                        },
                                                        watchEndpointSupportedOnesieConfig:
                                                          {
                                                            html5PlaybackOnesieConfig:
                                                              {
                                                                commonConfig: {
                                                                  url: "https://rr3---sn-uxaxh5ji-15be.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=ba856922473b38ea&ip=86.33.65.170&initcwndbps=636250&mt=1690886487&oweuc=",
                                                                },
                                                              },
                                                          },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                              shortBylineText: {
                                                runs: [
                                                  {
                                                    text: "Dorado Schmitt",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBoQljUYAyITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCFpzduxWbxR1P7L-ynuAtTw",
                                                        canonicalBaseUrl:
                                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                      },
                                                    },
                                                  },
                                                  {
                                                    text: " · ",
                                                  },
                                                  {
                                                    text: "Album",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBoQljUYAyITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCFpzduxWbxR1P7L-ynuAtTw",
                                                        canonicalBaseUrl:
                                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                              videoCountText: {
                                                runs: [
                                                  {
                                                    text: "13",
                                                  },
                                                  {
                                                    text: " videos",
                                                  },
                                                ],
                                              },
                                              navigationEndpoint: {
                                                clickTrackingParams:
                                                  "CBoQljUYAyITCLfAkOKku4ADFShYegUd0Y4KETIGZy1oaWdoWhhVQ0ZwemR1eFdieFIxUDdMLXludUF0VHeaAQYQ8jgYlwE=",
                                                commandMetadata: {
                                                  webCommandMetadata: {
                                                    url: "/watch?v=uoVpIkc7OOo&list=OLAK5uy_kx5r69bxcmu3o1wxTkDkAxsZMEb_jibfc",
                                                    webPageType:
                                                      "WEB_PAGE_TYPE_WATCH",
                                                    rootVe: 3832,
                                                  },
                                                },
                                                watchEndpoint: {
                                                  videoId: "uoVpIkc7OOo",
                                                  playlistId:
                                                    "OLAK5uy_kx5r69bxcmu3o1wxTkDkAxsZMEb_jibfc",
                                                  params: "OAI%3D",
                                                  loggingContext: {
                                                    vssLoggingContext: {
                                                      serializedContextData:
                                                        "GilPTEFLNXV5X2t4NXI2OWJ4Y211M28xd3hUa0RrQXhzWk1FYl9qaWJmYw%3D%3D",
                                                    },
                                                  },
                                                  watchEndpointSupportedOnesieConfig:
                                                    {
                                                      html5PlaybackOnesieConfig:
                                                        {
                                                          commonConfig: {
                                                            url: "https://rr3---sn-uxaxh5ji-15be.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=ba856922473b38ea&ip=86.33.65.170&initcwndbps=636250&mt=1690886487&oweuc=",
                                                          },
                                                        },
                                                    },
                                                },
                                              },
                                              publishedTimeText: {
                                                simpleText:
                                                  "Updated 2 days ago",
                                              },
                                              videoCountShortText: {
                                                simpleText: "13",
                                              },
                                              trackingParams:
                                                "CBoQljUYAyITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                              sidebarThumbnails: [
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/sLnN0aijOtE/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/9r_ANqnciKs/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/kLttB1BY0Us/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/duNwTmzqxpQ/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                              ],
                                              thumbnailText: {
                                                runs: [
                                                  {
                                                    text: "13",
                                                    bold: true,
                                                  },
                                                  {
                                                    text: " videos",
                                                  },
                                                ],
                                              },
                                              thumbnailRenderer: {
                                                playlistCustomThumbnailRenderer:
                                                  {
                                                    thumbnail: {
                                                      thumbnails: [
                                                        {
                                                          url: "https://i9.ytimg.com/s_p/OLAK5uy_kx5r69bxcmu3o1wxTkDkAxsZMEb_jibfc/mqdefault.jpg?sqp=CKzEo6YGir7X7AMGCM7glKYG&rs=AOn4CLCYYq1L9OiKoJyt0LdOsYad1bohXA&v=1690644558",
                                                          width: 180,
                                                          height: 180,
                                                        },
                                                        {
                                                          url: "https://i9.ytimg.com/s_p/OLAK5uy_kx5r69bxcmu3o1wxTkDkAxsZMEb_jibfc/sddefault.jpg?sqp=CKzEo6YGir7X7AMGCM7glKYG&rs=AOn4CLBrMvR1uTjRo38eERsJgwEv2ELKzw&v=1690644558",
                                                          width: 640,
                                                          height: 640,
                                                        },
                                                        {
                                                          url: "https://i9.ytimg.com/s_p/OLAK5uy_kx5r69bxcmu3o1wxTkDkAxsZMEb_jibfc/maxresdefault.jpg?sqp=CKzEo6YGir7X7AMGCM7glKYG&rs=AOn4CLAxdFdDdRebU0zM-SLFnbL_mahilg&v=1690644558",
                                                          width: 1200,
                                                          height: 1200,
                                                        },
                                                      ],
                                                      sampledThumbnailColor: {
                                                        red: 40,
                                                        green: 59,
                                                        blue: 114,
                                                      },
                                                      darkColorPalette: {
                                                        section2Color: 1186355,
                                                        iconInactiveColor: 7765395,
                                                      },
                                                      vibrantColorPalette: {
                                                        iconInactiveColor: 7042713,
                                                      },
                                                    },
                                                  },
                                              },
                                              longBylineText: {
                                                runs: [
                                                  {
                                                    text: "Dorado Schmitt",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBoQljUYAyITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCFpzduxWbxR1P7L-ynuAtTw",
                                                        canonicalBaseUrl:
                                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                      },
                                                    },
                                                  },
                                                  {
                                                    text: " · ",
                                                  },
                                                  {
                                                    text: "Album",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBoQljUYAyITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCFpzduxWbxR1P7L-ynuAtTw",
                                                        canonicalBaseUrl:
                                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                              thumbnailOverlays: [
                                                {
                                                  thumbnailOverlayBottomPanelRenderer:
                                                    {
                                                      text: {
                                                        simpleText: "13 songs",
                                                      },
                                                      icon: {
                                                        iconType: "MUSIC",
                                                      },
                                                    },
                                                },
                                                {
                                                  thumbnailOverlayHoverTextRenderer:
                                                    {
                                                      text: {
                                                        runs: [
                                                          {
                                                            text: "Play all",
                                                          },
                                                        ],
                                                      },
                                                      icon: {
                                                        iconType: "PLAY_ALL",
                                                      },
                                                    },
                                                },
                                                {
                                                  thumbnailOverlayNowPlayingRenderer:
                                                    {
                                                      text: {
                                                        runs: [
                                                          {
                                                            text: "Now playing",
                                                          },
                                                        ],
                                                      },
                                                    },
                                                },
                                              ],
                                              viewPlaylistText: {
                                                runs: [
                                                  {
                                                    text: "View full playlist",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBoQljUYAyITCLfAkOKku4ADFShYegUd0Y4KETIGZy1oaWdo",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/playlist?list=OLAK5uy_kx5r69bxcmu3o1wxTkDkAxsZMEb_jibfc",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_PLAYLIST",
                                                          rootVe: 5754,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "VLOLAK5uy_kx5r69bxcmu3o1wxTkDkAxsZMEb_jibfc",
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            },
                                          },
                                          {
                                            gridPlaylistRenderer: {
                                              playlistId:
                                                "OLAK5uy_kSEhoBZ875WUHhZ2vWSDxWPpshfO74WTo",
                                              thumbnail: {
                                                thumbnails: [
                                                  {
                                                    url: "https://i.ytimg.com/vi/ghCt7wlgHq0/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLAd4QONy-LnUSIAnbiJETBc9C5BRQ",
                                                    width: 480,
                                                    height: 270,
                                                  },
                                                ],
                                                sampledThumbnailColor: {
                                                  red: 101,
                                                  green: 56,
                                                  blue: 46,
                                                },
                                                darkColorPalette: {
                                                  section2Color: 3349527,
                                                  iconInactiveColor: 9665398,
                                                },
                                                vibrantColorPalette: {
                                                  iconInactiveColor: 10056555,
                                                },
                                              },
                                              title: {
                                                runs: [
                                                  {
                                                    text: "Family",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBkQljUYBCITCLfAkOKku4ADFShYegUd0Y4KETIGZy1oaWdoWhhVQ0ZwemR1eFdieFIxUDdMLXludUF0VHeaAQYQ8jgYlwE=",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/watch?v=ghCt7wlgHq0&list=OLAK5uy_kSEhoBZ875WUHhZ2vWSDxWPpshfO74WTo",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_WATCH",
                                                          rootVe: 3832,
                                                        },
                                                      },
                                                      watchEndpoint: {
                                                        videoId: "ghCt7wlgHq0",
                                                        playlistId:
                                                          "OLAK5uy_kSEhoBZ875WUHhZ2vWSDxWPpshfO74WTo",
                                                        params: "OAI%3D",
                                                        loggingContext: {
                                                          vssLoggingContext: {
                                                            serializedContextData:
                                                              "GilPTEFLNXV5X2tTRWhvQlo4NzVXVUhoWjJ2V1NEeFdQcHNoZk83NFdUbw%3D%3D",
                                                          },
                                                        },
                                                        watchEndpointSupportedOnesieConfig:
                                                          {
                                                            html5PlaybackOnesieConfig:
                                                              {
                                                                commonConfig: {
                                                                  url: "https://rr2---sn-uxaxh5ji-15be.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=8210adef09601ead&ip=86.33.65.170&initcwndbps=636250&mt=1690886487&oweuc=",
                                                                },
                                                              },
                                                          },
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                              shortBylineText: {
                                                runs: [
                                                  {
                                                    text: "Dorado Schmitt",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBkQljUYBCITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCFpzduxWbxR1P7L-ynuAtTw",
                                                        canonicalBaseUrl:
                                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                      },
                                                    },
                                                  },
                                                  {
                                                    text: " · ",
                                                  },
                                                  {
                                                    text: "Album",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBkQljUYBCITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCFpzduxWbxR1P7L-ynuAtTw",
                                                        canonicalBaseUrl:
                                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                              videoCountText: {
                                                runs: [
                                                  {
                                                    text: "15",
                                                  },
                                                  {
                                                    text: " videos",
                                                  },
                                                ],
                                              },
                                              navigationEndpoint: {
                                                clickTrackingParams:
                                                  "CBkQljUYBCITCLfAkOKku4ADFShYegUd0Y4KETIGZy1oaWdoWhhVQ0ZwemR1eFdieFIxUDdMLXludUF0VHeaAQYQ8jgYlwE=",
                                                commandMetadata: {
                                                  webCommandMetadata: {
                                                    url: "/watch?v=ghCt7wlgHq0&list=OLAK5uy_kSEhoBZ875WUHhZ2vWSDxWPpshfO74WTo",
                                                    webPageType:
                                                      "WEB_PAGE_TYPE_WATCH",
                                                    rootVe: 3832,
                                                  },
                                                },
                                                watchEndpoint: {
                                                  videoId: "ghCt7wlgHq0",
                                                  playlistId:
                                                    "OLAK5uy_kSEhoBZ875WUHhZ2vWSDxWPpshfO74WTo",
                                                  params: "OAI%3D",
                                                  loggingContext: {
                                                    vssLoggingContext: {
                                                      serializedContextData:
                                                        "GilPTEFLNXV5X2tTRWhvQlo4NzVXVUhoWjJ2V1NEeFdQcHNoZk83NFdUbw%3D%3D",
                                                    },
                                                  },
                                                  watchEndpointSupportedOnesieConfig:
                                                    {
                                                      html5PlaybackOnesieConfig:
                                                        {
                                                          commonConfig: {
                                                            url: "https://rr2---sn-uxaxh5ji-15be.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=8210adef09601ead&ip=86.33.65.170&initcwndbps=636250&mt=1690886487&oweuc=",
                                                          },
                                                        },
                                                    },
                                                },
                                              },
                                              videoCountShortText: {
                                                simpleText: "15",
                                              },
                                              trackingParams:
                                                "CBkQljUYBCITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                              sidebarThumbnails: [
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/7Dx1lsJZSG4/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/WFE5Jt92fak/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/JK--AkGcZoo/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                                {
                                                  thumbnails: [
                                                    {
                                                      url: "https://i.ytimg.com/vi/J49tHT4-jcw/default.jpg",
                                                      width: 43,
                                                      height: 20,
                                                    },
                                                  ],
                                                },
                                              ],
                                              thumbnailText: {
                                                runs: [
                                                  {
                                                    text: "15",
                                                    bold: true,
                                                  },
                                                  {
                                                    text: " videos",
                                                  },
                                                ],
                                              },
                                              thumbnailRenderer: {
                                                playlistCustomThumbnailRenderer:
                                                  {
                                                    thumbnail: {
                                                      thumbnails: [
                                                        {
                                                          url: "https://i9.ytimg.com/s_p/OLAK5uy_kSEhoBZ875WUHhZ2vWSDxWPpshfO74WTo/mqdefault.jpg?sqp=CKzEo6YGir7X7AMGCMznutwF&rs=AOn4CLBZf_e9ndkoarFHv8diWQIF8VrIhw&v=1536078796",
                                                          width: 180,
                                                          height: 180,
                                                        },
                                                        {
                                                          url: "https://i9.ytimg.com/s_p/OLAK5uy_kSEhoBZ875WUHhZ2vWSDxWPpshfO74WTo/sddefault.jpg?sqp=CKzEo6YGir7X7AMGCMznutwF&rs=AOn4CLDG2IRuaNpuC2QulkEGhqniaO9yPA&v=1536078796",
                                                          width: 640,
                                                          height: 640,
                                                        },
                                                        {
                                                          url: "https://i9.ytimg.com/s_p/OLAK5uy_kSEhoBZ875WUHhZ2vWSDxWPpshfO74WTo/maxresdefault.jpg?sqp=CKzEo6YGir7X7AMGCMznutwF&rs=AOn4CLB4PPP7vRcbfxaA8qzqZp1xhzW-MA&v=1536078796",
                                                          width: 1200,
                                                          height: 1200,
                                                        },
                                                      ],
                                                      sampledThumbnailColor: {
                                                        red: 101,
                                                        green: 56,
                                                        blue: 46,
                                                      },
                                                      darkColorPalette: {
                                                        section2Color: 3349527,
                                                        iconInactiveColor: 9665398,
                                                      },
                                                      vibrantColorPalette: {
                                                        iconInactiveColor: 10056555,
                                                      },
                                                    },
                                                  },
                                              },
                                              longBylineText: {
                                                runs: [
                                                  {
                                                    text: "Dorado Schmitt",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBkQljUYBCITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCFpzduxWbxR1P7L-ynuAtTw",
                                                        canonicalBaseUrl:
                                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                      },
                                                    },
                                                  },
                                                  {
                                                    text: " · ",
                                                  },
                                                  {
                                                    text: "Album",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBkQljUYBCITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_CHANNEL",
                                                          rootVe: 3611,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "UCFpzduxWbxR1P7L-ynuAtTw",
                                                        canonicalBaseUrl:
                                                          "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                              thumbnailOverlays: [
                                                {
                                                  thumbnailOverlayBottomPanelRenderer:
                                                    {
                                                      text: {
                                                        simpleText: "15 songs",
                                                      },
                                                      icon: {
                                                        iconType: "MUSIC",
                                                      },
                                                    },
                                                },
                                                {
                                                  thumbnailOverlayHoverTextRenderer:
                                                    {
                                                      text: {
                                                        runs: [
                                                          {
                                                            text: "Play all",
                                                          },
                                                        ],
                                                      },
                                                      icon: {
                                                        iconType: "PLAY_ALL",
                                                      },
                                                    },
                                                },
                                                {
                                                  thumbnailOverlayNowPlayingRenderer:
                                                    {
                                                      text: {
                                                        runs: [
                                                          {
                                                            text: "Now playing",
                                                          },
                                                        ],
                                                      },
                                                    },
                                                },
                                              ],
                                              viewPlaylistText: {
                                                runs: [
                                                  {
                                                    text: "View full playlist",
                                                    navigationEndpoint: {
                                                      clickTrackingParams:
                                                        "CBkQljUYBCITCLfAkOKku4ADFShYegUd0Y4KETIGZy1oaWdo",
                                                      commandMetadata: {
                                                        webCommandMetadata: {
                                                          url: "/playlist?list=OLAK5uy_kSEhoBZ875WUHhZ2vWSDxWPpshfO74WTo",
                                                          webPageType:
                                                            "WEB_PAGE_TYPE_PLAYLIST",
                                                          rootVe: 5754,
                                                          apiUrl:
                                                            "/youtubei/v1/browse",
                                                        },
                                                      },
                                                      browseEndpoint: {
                                                        browseId:
                                                          "VLOLAK5uy_kSEhoBZ875WUHhZ2vWSDxWPpshfO74WTo",
                                                      },
                                                    },
                                                  },
                                                ],
                                              },
                                            },
                                          },
                                        ],
                                        trackingParams:
                                          "CBYQxjkiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                                        visibleItemCount: 4,
                                        nextButton: {
                                          buttonRenderer: {
                                            style: "STYLE_DEFAULT",
                                            size: "SIZE_DEFAULT",
                                            isDisabled: false,
                                            icon: {
                                              iconType: "CHEVRON_RIGHT",
                                            },
                                            accessibility: {
                                              label: "Next",
                                            },
                                            trackingParams:
                                              "CBgQ8FsiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                                          },
                                        },
                                        previousButton: {
                                          buttonRenderer: {
                                            style: "STYLE_DEFAULT",
                                            size: "SIZE_DEFAULT",
                                            isDisabled: false,
                                            icon: {
                                              iconType: "CHEVRON_LEFT",
                                            },
                                            accessibility: {
                                              label: "Previous",
                                            },
                                            trackingParams:
                                              "CBcQ8FsiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                                          },
                                        },
                                      },
                                    },
                                    trackingParams:
                                      "CBUQ3BwYACITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                                  },
                                },
                              ],
                              trackingParams:
                                "CBQQuy8YACITCLfAkOKku4ADFShYegUd0Y4KEQ==",
                            },
                          },
                        ],
                        trackingParams: "CBMQui8iEwi3wJDipLuAAxUoWHoFHdGOChE=",
                        targetId: "browse-feedUCFpzduxWbxR1P7L-ynuAtTwfeatured",
                        disablePullToRefresh: true,
                      },
                    },
                    trackingParams: "CBIQ8JMBGAUiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                  },
                },
                {
                  tabRenderer: {
                    endpoint: {
                      clickTrackingParams:
                        "CBEQ8JMBGAYiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                      commandMetadata: {
                        webCommandMetadata: {
                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw/playlists",
                          webPageType: "WEB_PAGE_TYPE_CHANNEL",
                          rootVe: 3611,
                          apiUrl: "/youtubei/v1/browse",
                        },
                      },
                      browseEndpoint: {
                        browseId: "UCFpzduxWbxR1P7L-ynuAtTw",
                        params: "EglwbGF5bGlzdHPyBgQKAkIA",
                        canonicalBaseUrl: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                      },
                    },
                    title: "Playlists",
                    trackingParams: "CBEQ8JMBGAYiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                  },
                },
                {
                  tabRenderer: {
                    endpoint: {
                      clickTrackingParams:
                        "CBAQ8JMBGAciEwi3wJDipLuAAxUoWHoFHdGOChE=",
                      commandMetadata: {
                        webCommandMetadata: {
                          url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw/about",
                          webPageType: "WEB_PAGE_TYPE_CHANNEL",
                          rootVe: 3611,
                          apiUrl: "/youtubei/v1/browse",
                        },
                      },
                      browseEndpoint: {
                        browseId: "UCFpzduxWbxR1P7L-ynuAtTw",
                        params: "EgVhYm91dPIGBAoCEgA%3D",
                        canonicalBaseUrl: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                      },
                    },
                    title: "About",
                    trackingParams: "CBAQ8JMBGAciEwi3wJDipLuAAxUoWHoFHdGOChE=",
                  },
                },
              ],
            },
          },
          header: {
            c4TabbedHeaderRenderer: {
              channelId: "UCFpzduxWbxR1P7L-ynuAtTw",
              title: "Dorado Schmitt - Topic",
              navigationEndpoint: {
                clickTrackingParams: "CA0Q8DsiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                commandMetadata: {
                  webCommandMetadata: {
                    url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                    webPageType: "WEB_PAGE_TYPE_CHANNEL",
                    rootVe: 3611,
                    apiUrl: "/youtubei/v1/browse",
                  },
                },
                browseEndpoint: {
                  browseId: "UCFpzduxWbxR1P7L-ynuAtTw",
                  canonicalBaseUrl: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                },
              },
              avatar: {
                thumbnails: [
                  {
                    url: "https://yt3.googleusercontent.com/Y46hwYw40rv539apiOjLnGvtou0ISMsNOKr-gLhjAFImRCgM0AJL_80pgn-RXxno6Y4i0u9aMg=s48-c-k-c0x00ffffff-no-rj",
                    width: 48,
                    height: 48,
                  },
                  {
                    url: "https://yt3.googleusercontent.com/Y46hwYw40rv539apiOjLnGvtou0ISMsNOKr-gLhjAFImRCgM0AJL_80pgn-RXxno6Y4i0u9aMg=s88-c-k-c0x00ffffff-no-rj",
                    width: 88,
                    height: 88,
                  },
                  {
                    url: "https://yt3.googleusercontent.com/Y46hwYw40rv539apiOjLnGvtou0ISMsNOKr-gLhjAFImRCgM0AJL_80pgn-RXxno6Y4i0u9aMg=s176-c-k-c0x00ffffff-no-rj",
                    width: 176,
                    height: 176,
                  },
                ],
              },
              banner: {
                thumbnails: [
                  {
                    url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
                    width: 1060,
                    height: 175,
                  },
                  {
                    url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w1138-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
                    width: 1138,
                    height: 188,
                  },
                  {
                    url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
                    width: 1707,
                    height: 283,
                  },
                  {
                    url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
                    width: 2120,
                    height: 351,
                  },
                  {
                    url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w2276-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
                    width: 2276,
                    height: 377,
                  },
                  {
                    url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
                    width: 2560,
                    height: 424,
                  },
                ],
              },
              subscribeButton: {
                buttonRenderer: {
                  style: "STYLE_DESTRUCTIVE",
                  size: "SIZE_DEFAULT",
                  isDisabled: false,
                  text: {
                    runs: [
                      {
                        text: "Subscribe",
                      },
                    ],
                  },
                  navigationEndpoint: {
                    clickTrackingParams: "CA4Q8FsiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                    commandMetadata: {
                      webCommandMetadata: {
                        ignoreNavigation: true,
                      },
                    },
                    modalEndpoint: {
                      modal: {
                        modalWithTitleAndButtonRenderer: {
                          title: {
                            simpleText: "Want to subscribe to this channel?",
                          },
                          content: {
                            simpleText: "Sign in to subscribe to this channel.",
                          },
                          button: {
                            buttonRenderer: {
                              style: "STYLE_BLUE_TEXT",
                              size: "SIZE_DEFAULT",
                              isDisabled: false,
                              text: {
                                simpleText: "Sign in",
                              },
                              navigationEndpoint: {
                                clickTrackingParams:
                                  "CA8Q_YYEIhMIt8CQ4qS7gAMVKFh6BR3RjgoRMglzdWJzY3JpYmU=",
                                commandMetadata: {
                                  webCommandMetadata: {
                                    url: "https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3D%252Fchannel%252FUCFpzduxWbxR1P7L-ynuAtTw%252Fvideos%26continue_action%3DQUFFLUhqbklQMmhLMno4NXFYQkk1ZGlyNlZhcEN0NlBJUXxBQ3Jtc0tuLTJ4dDF2enVrdkJabkZTOXFmZGJNSHdZaWI0WWhabWxWX0h2Vmk1NzEybll0Yk5sOWRNeTgtRG1uVDV1QmEybERfalF5NzEwM2c4Y1d1MTE1TklhWTJCRG0zZTFxMEFoY1Q2RW1BRW5Sb1BOdDVvcGxRaEVOV3BES1I2QUJobFlWWVJsa2dadjFXbFYwUGFMQkQxd1lKZ3FYSWRobXFSNDZ6X3RKdEs0emI4SzlvNGJFME9aNnhBSjJiMzRFb3NGcWxCeDI&hl=en&ec=66429",
                                    webPageType: "WEB_PAGE_TYPE_UNKNOWN",
                                    rootVe: 83769,
                                  },
                                },
                                signInEndpoint: {
                                  nextEndpoint: {
                                    clickTrackingParams:
                                      "CA8Q_YYEIhMIt8CQ4qS7gAMVKFh6BR3RjgoR",
                                    commandMetadata: {
                                      webCommandMetadata: {
                                        url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw/videos",
                                        webPageType: "WEB_PAGE_TYPE_CHANNEL",
                                        rootVe: 3611,
                                        apiUrl: "/youtubei/v1/browse",
                                      },
                                    },
                                    browseEndpoint: {
                                      browseId: "UCFpzduxWbxR1P7L-ynuAtTw",
                                      params: "EgZ2aWRlb3M%3D",
                                      canonicalBaseUrl:
                                        "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                    },
                                  },
                                  continueAction:
                                    "QUFFLUhqbklQMmhLMno4NXFYQkk1ZGlyNlZhcEN0NlBJUXxBQ3Jtc0tuLTJ4dDF2enVrdkJabkZTOXFmZGJNSHdZaWI0WWhabWxWX0h2Vmk1NzEybll0Yk5sOWRNeTgtRG1uVDV1QmEybERfalF5NzEwM2c4Y1d1MTE1TklhWTJCRG0zZTFxMEFoY1Q2RW1BRW5Sb1BOdDVvcGxRaEVOV3BES1I2QUJobFlWWVJsa2dadjFXbFYwUGFMQkQxd1lKZ3FYSWRobXFSNDZ6X3RKdEs0emI4SzlvNGJFME9aNnhBSjJiMzRFb3NGcWxCeDI",
                                  idamTag: "66429",
                                },
                              },
                              trackingParams:
                                "CA8Q_YYEIhMIt8CQ4qS7gAMVKFh6BR3RjgoR",
                            },
                          },
                        },
                      },
                    },
                  },
                  trackingParams: "CA4Q8FsiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                },
              },
              subscriberCountText: {
                accessibility: {
                  accessibilityData: {
                    label: "535 subscribers",
                  },
                },
                simpleText: "535 subscribers",
              },
              tvBanner: {
                thumbnails: [
                  {
                    url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w320-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj",
                    width: 320,
                    height: 180,
                  },
                  {
                    url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w854-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj",
                    width: 854,
                    height: 480,
                  },
                  {
                    url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w1280-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj",
                    width: 1280,
                    height: 720,
                  },
                  {
                    url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w1920-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj",
                    width: 1920,
                    height: 1080,
                  },
                  {
                    url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w2120-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj",
                    width: 2120,
                    height: 1192,
                  },
                ],
              },
              mobileBanner: {
                thumbnails: [
                  {
                    url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w320-fcrop64=1,32b75a57cd48a5a8-k-c0xffffffff-no-nd-rj",
                    width: 320,
                    height: 88,
                  },
                  {
                    url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w640-fcrop64=1,32b75a57cd48a5a8-k-c0xffffffff-no-nd-rj",
                    width: 640,
                    height: 175,
                  },
                  {
                    url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w960-fcrop64=1,32b75a57cd48a5a8-k-c0xffffffff-no-nd-rj",
                    width: 960,
                    height: 263,
                  },
                  {
                    url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w1280-fcrop64=1,32b75a57cd48a5a8-k-c0xffffffff-no-nd-rj",
                    width: 1280,
                    height: 351,
                  },
                  {
                    url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w1440-fcrop64=1,32b75a57cd48a5a8-k-c0xffffffff-no-nd-rj",
                    width: 1440,
                    height: 395,
                  },
                ],
              },
              trackingParams: "CA0Q8DsiEwi3wJDipLuAAxUoWHoFHdGOChE=",
              style: "C4_TABBED_HEADER_RENDERER_STYLE_MODERN",
              videosCountText: {
                runs: [
                  {
                    text: "76",
                  },
                  {
                    text: " videos",
                  },
                ],
              },
              tagline: {
                channelTaglineRenderer: {
                  content: "More about this channel",
                  maxLines: 1,
                  moreLabel: "... more",
                  moreEndpoint: {
                    clickTrackingParams: "CA0Q8DsiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                    commandMetadata: {
                      webCommandMetadata: {
                        url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw/about",
                        webPageType: "WEB_PAGE_TYPE_CHANNEL",
                        rootVe: 3611,
                        apiUrl: "/youtubei/v1/browse",
                      },
                    },
                    browseEndpoint: {
                      browseId: "UCFpzduxWbxR1P7L-ynuAtTw",
                      params: "EgVhYm91dPIGBAoCEgA%3D",
                      canonicalBaseUrl: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                    },
                  },
                  moreIcon: {
                    iconType: "CHEVRON_RIGHT",
                  },
                },
              },
            },
          },
          metadata: {
            channelMetadataRenderer: {
              title: "Dorado Schmitt - Topic",
              description: "",
              rssUrl:
                "https://www.youtube.com/feeds/videos.xml?channel_id=UCFpzduxWbxR1P7L-ynuAtTw",
              externalId: "UCFpzduxWbxR1P7L-ynuAtTw",
              keywords: "",
              ownerUrls: [
                "http://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
              ],
              avatar: {
                thumbnails: [
                  {
                    url: "https://yt3.googleusercontent.com/Y46hwYw40rv539apiOjLnGvtou0ISMsNOKr-gLhjAFImRCgM0AJL_80pgn-RXxno6Y4i0u9aMg=s900-c-k-c0x00ffffff-no-rj",
                    width: 900,
                    height: 900,
                  },
                ],
              },
              channelUrl:
                "https://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
              isFamilySafe: true,
              availableCountryCodes: [
                "PM",
                "SD",
                "TC",
                "JE",
                "ST",
                "KE",
                "OM",
                "NG",
                "KI",
                "PS",
                "FO",
                "CW",
                "BL",
                "MY",
                "VI",
                "DO",
                "IE",
                "TZ",
                "BR",
                "GE",
                "MA",
                "BG",
                "AG",
                "JO",
                "LC",
                "MD",
                "RW",
                "SL",
                "TT",
                "IM",
                "NE",
                "VN",
                "KY",
                "GU",
                "SJ",
                "ES",
                "TJ",
                "CL",
                "PA",
                "MT",
                "TD",
                "LY",
                "GR",
                "CK",
                "SO",
                "AS",
                "ML",
                "AZ",
                "PW",
                "WF",
                "TW",
                "GB",
                "PT",
                "TF",
                "KZ",
                "TO",
                "ET",
                "UY",
                "FM",
                "GQ",
                "MH",
                "MX",
                "MN",
                "HN",
                "SM",
                "LU",
                "CD",
                "QA",
                "DZ",
                "KN",
                "SH",
                "BB",
                "GH",
                "AX",
                "TV",
                "KP",
                "LA",
                "NA",
                "NR",
                "WS",
                "RO",
                "CG",
                "PF",
                "UZ",
                "CM",
                "GI",
                "NO",
                "LB",
                "PK",
                "KW",
                "AM",
                "AU",
                "TM",
                "IN",
                "PL",
                "SG",
                "SN",
                "AT",
                "UA",
                "FR",
                "HU",
                "BA",
                "IR",
                "US",
                "LK",
                "UG",
                "NP",
                "MP",
                "SE",
                "FI",
                "MU",
                "BW",
                "MG",
                "BO",
                "AO",
                "SB",
                "EE",
                "ME",
                "MM",
                "EG",
                "MW",
                "BT",
                "BZ",
                "CC",
                "MC",
                "SV",
                "PG",
                "HR",
                "IL",
                "BJ",
                "AD",
                "GP",
                "PR",
                "EC",
                "BN",
                "DK",
                "AQ",
                "GN",
                "GL",
                "BM",
                "LV",
                "EH",
                "SS",
                "NL",
                "TL",
                "UM",
                "AR",
                "VE",
                "PY",
                "LI",
                "NU",
                "IQ",
                "PH",
                "CH",
                "SA",
                "ID",
                "SZ",
                "CX",
                "SC",
                "AI",
                "TN",
                "MK",
                "YT",
                "LT",
                "FJ",
                "MQ",
                "CF",
                "VG",
                "BQ",
                "CZ",
                "VA",
                "YE",
                "PN",
                "MS",
                "NC",
                "KR",
                "SX",
                "ER",
                "HK",
                "MV",
                "AW",
                "MR",
                "IT",
                "BS",
                "DE",
                "GA",
                "LR",
                "FK",
                "CN",
                "RE",
                "GG",
                "RS",
                "SK",
                "AF",
                "CY",
                "BE",
                "KH",
                "HT",
                "KG",
                "BD",
                "GD",
                "GY",
                "ZM",
                "CU",
                "NZ",
                "TG",
                "BH",
                "BV",
                "NF",
                "TK",
                "VU",
                "CV",
                "DJ",
                "BY",
                "SR",
                "BI",
                "VC",
                "BF",
                "GW",
                "IS",
                "ZW",
                "RU",
                "CI",
                "KM",
                "TH",
                "HM",
                "GT",
                "SI",
                "SY",
                "LS",
                "DM",
                "NI",
                "AL",
                "CA",
                "GF",
                "GS",
                "JM",
                "TR",
                "JP",
                "MZ",
                "CR",
                "GM",
                "PE",
                "CO",
                "AE",
                "IO",
                "MF",
                "MO",
                "ZA",
              ],
              musicArtistName: "Dorado Schmitt",
              androidDeepLink:
                "android-app://com.google.android.youtube/http/www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
              androidAppindexingLink:
                "android-app://com.google.android.youtube/http/www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
              iosAppindexingLink:
                "ios-app://544007664/vnd.youtube/www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
              vanityChannelUrl:
                "http://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
            },
          },
          trackingParams: "CAAQhGciEwi3wJDipLuAAxUoWHoFHdGOChE=",
          topbar: {
            desktopTopbarRenderer: {
              logo: {
                topbarLogoRenderer: {
                  iconImage: {
                    iconType: "YOUTUBE_LOGO",
                  },
                  tooltipText: {
                    runs: [
                      {
                        text: "YouTube Home",
                      },
                    ],
                  },
                  endpoint: {
                    clickTrackingParams: "CAwQsV4iEwi3wJDipLuAAxUoWHoFHdGOChE=",
                    commandMetadata: {
                      webCommandMetadata: {
                        url: "/",
                        webPageType: "WEB_PAGE_TYPE_BROWSE",
                        rootVe: 3854,
                        apiUrl: "/youtubei/v1/browse",
                      },
                    },
                    browseEndpoint: {
                      browseId: "FEwhat_to_watch",
                    },
                  },
                  trackingParams: "CAwQsV4iEwi3wJDipLuAAxUoWHoFHdGOChE=",
                  overrideEntityKey: "EgZ0b3BiYXIg9QEoAQ%3D%3D",
                },
              },
              searchbox: {
                fusionSearchboxRenderer: {
                  icon: {
                    iconType: "SEARCH",
                  },
                  placeholderText: {
                    runs: [
                      {
                        text: "Search",
                      },
                    ],
                  },
                  config: {
                    webSearchboxConfig: {
                      requestLanguage: "en",
                      requestDomain: "hr",
                      hasOnscreenKeyboard: false,
                      focusSearchbox: true,
                    },
                  },
                  trackingParams: "CAoQ7VAiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                  searchEndpoint: {
                    clickTrackingParams: "CAoQ7VAiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                    commandMetadata: {
                      webCommandMetadata: {
                        url: "/results?search_query=",
                        webPageType: "WEB_PAGE_TYPE_SEARCH",
                        rootVe: 4724,
                      },
                    },
                    searchEndpoint: {
                      query: "",
                    },
                  },
                  clearButton: {
                    buttonRenderer: {
                      style: "STYLE_DEFAULT",
                      size: "SIZE_DEFAULT",
                      isDisabled: false,
                      icon: {
                        iconType: "CLOSE",
                      },
                      trackingParams: "CAsQ8FsiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                      accessibilityData: {
                        accessibilityData: {
                          label: "Clear search query",
                        },
                      },
                    },
                  },
                },
              },
              trackingParams: "CAEQq6wBIhMIt8CQ4qS7gAMVKFh6BR3RjgoR",
              countryCode: "HR",
              topbarButtons: [
                {
                  topbarMenuButtonRenderer: {
                    icon: {
                      iconType: "MORE_VERT",
                    },
                    menuRequest: {
                      clickTrackingParams:
                        "CAgQ_qsBGAAiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                      commandMetadata: {
                        webCommandMetadata: {
                          sendPost: true,
                          apiUrl: "/youtubei/v1/account/account_menu",
                        },
                      },
                      signalServiceEndpoint: {
                        signal: "GET_ACCOUNT_MENU",
                        actions: [
                          {
                            clickTrackingParams:
                              "CAgQ_qsBGAAiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                            openPopupAction: {
                              popup: {
                                multiPageMenuRenderer: {
                                  trackingParams:
                                    "CAkQ_6sBIhMIt8CQ4qS7gAMVKFh6BR3RjgoR",
                                  style: "MULTI_PAGE_MENU_STYLE_TYPE_SYSTEM",
                                  showLoadingSpinner: true,
                                },
                              },
                              popupType: "DROPDOWN",
                              beReused: true,
                            },
                          },
                        ],
                      },
                    },
                    trackingParams: "CAgQ_qsBGAAiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                    accessibility: {
                      accessibilityData: {
                        label: "Settings",
                      },
                    },
                    tooltip: "Settings",
                    style: "STYLE_DEFAULT",
                  },
                },
                {
                  buttonRenderer: {
                    style: "STYLE_SUGGESTIVE",
                    size: "SIZE_SMALL",
                    text: {
                      runs: [
                        {
                          text: "Sign in",
                        },
                      ],
                    },
                    icon: {
                      iconType: "AVATAR_LOGGED_OUT",
                    },
                    navigationEndpoint: {
                      clickTrackingParams:
                        "CAcQ1IAEGAEiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                      commandMetadata: {
                        webCommandMetadata: {
                          url: "https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252Fchannel%252FUCFpzduxWbxR1P7L-ynuAtTw%252Fvideos%253Fflow%253Dgrid%2526view%253D0&hl=en&ec=65620",
                          webPageType: "WEB_PAGE_TYPE_UNKNOWN",
                          rootVe: 83769,
                        },
                      },
                      signInEndpoint: {
                        idamTag: "65620",
                      },
                    },
                    trackingParams: "CAcQ1IAEGAEiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                    targetId: "topbar-signin",
                  },
                },
              ],
              hotkeyDialog: {
                hotkeyDialogRenderer: {
                  title: {
                    runs: [
                      {
                        text: "Keyboard shortcuts",
                      },
                    ],
                  },
                  sections: [
                    {
                      hotkeyDialogSectionRenderer: {
                        title: {
                          runs: [
                            {
                              text: "Playback",
                            },
                          ],
                        },
                        options: [
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Toggle play/pause",
                                  },
                                ],
                              },
                              hotkey: "k",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Rewind 10 seconds",
                                  },
                                ],
                              },
                              hotkey: "j",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Fast forward 10 seconds",
                                  },
                                ],
                              },
                              hotkey: "l",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Previous video",
                                  },
                                ],
                              },
                              hotkey: "P (SHIFT+p)",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Next video",
                                  },
                                ],
                              },
                              hotkey: "N (SHIFT+n)",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Previous frame (while paused)",
                                  },
                                ],
                              },
                              hotkey: ",",
                              hotkeyAccessibilityLabel: {
                                accessibilityData: {
                                  label: "Comma",
                                },
                              },
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Next frame (while paused)",
                                  },
                                ],
                              },
                              hotkey: ".",
                              hotkeyAccessibilityLabel: {
                                accessibilityData: {
                                  label: "Period",
                                },
                              },
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Decrease playback rate",
                                  },
                                ],
                              },
                              hotkey: "< (SHIFT+,)",
                              hotkeyAccessibilityLabel: {
                                accessibilityData: {
                                  label: "Less than or SHIFT + comma",
                                },
                              },
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Increase playback rate",
                                  },
                                ],
                              },
                              hotkey: "> (SHIFT+.)",
                              hotkeyAccessibilityLabel: {
                                accessibilityData: {
                                  label: "Greater than or SHIFT + period",
                                },
                              },
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Seek to specific point in the video (7 advances to 70% of duration)",
                                  },
                                ],
                              },
                              hotkey: "0..9",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Seek to previous chapter",
                                  },
                                ],
                              },
                              hotkey: "CONTROL + ←",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Seek to next chapter",
                                  },
                                ],
                              },
                              hotkey: "CONTROL + →",
                            },
                          },
                        ],
                      },
                    },
                    {
                      hotkeyDialogSectionRenderer: {
                        title: {
                          runs: [
                            {
                              text: "General",
                            },
                          ],
                        },
                        options: [
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Toggle full screen",
                                  },
                                ],
                              },
                              hotkey: "f",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Toggle theater mode",
                                  },
                                ],
                              },
                              hotkey: "t",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Toggle miniplayer",
                                  },
                                ],
                              },
                              hotkey: "i",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Close miniplayer or current dialog",
                                  },
                                ],
                              },
                              hotkey: "ESCAPE",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Toggle mute",
                                  },
                                ],
                              },
                              hotkey: "m",
                            },
                          },
                        ],
                      },
                    },
                    {
                      hotkeyDialogSectionRenderer: {
                        title: {
                          runs: [
                            {
                              text: "Subtitles and closed captions",
                            },
                          ],
                        },
                        options: [
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "If the video supports captions, toggle captions ON/OFF",
                                  },
                                ],
                              },
                              hotkey: "c",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Rotate through different text opacity levels",
                                  },
                                ],
                              },
                              hotkey: "o",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Rotate through different window opacity levels",
                                  },
                                ],
                              },
                              hotkey: "w",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Rotate through font sizes (increasing)",
                                  },
                                ],
                              },
                              hotkey: "+",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Rotate through font sizes (decreasing)",
                                  },
                                ],
                              },
                              hotkey: "-",
                              hotkeyAccessibilityLabel: {
                                accessibilityData: {
                                  label: "Minus",
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                    {
                      hotkeyDialogSectionRenderer: {
                        title: {
                          runs: [
                            {
                              text: "Spherical Videos",
                            },
                          ],
                        },
                        options: [
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Pan up",
                                  },
                                ],
                              },
                              hotkey: "w",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Pan left",
                                  },
                                ],
                              },
                              hotkey: "a",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Pan down",
                                  },
                                ],
                              },
                              hotkey: "s",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Pan right",
                                  },
                                ],
                              },
                              hotkey: "d",
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Zoom in",
                                  },
                                ],
                              },
                              hotkey: "+ on numpad or ]",
                              hotkeyAccessibilityLabel: {
                                accessibilityData: {
                                  label: "Plus on number pad or right bracket",
                                },
                              },
                            },
                          },
                          {
                            hotkeyDialogSectionOptionRenderer: {
                              label: {
                                runs: [
                                  {
                                    text: "Zoom out",
                                  },
                                ],
                              },
                              hotkey: "- on numpad or [",
                              hotkeyAccessibilityLabel: {
                                accessibilityData: {
                                  label: "Minus on number pad or left bracket",
                                },
                              },
                            },
                          },
                        ],
                      },
                    },
                  ],
                  dismissButton: {
                    buttonRenderer: {
                      style: "STYLE_BLUE_TEXT",
                      size: "SIZE_DEFAULT",
                      isDisabled: false,
                      text: {
                        runs: [
                          {
                            text: "Dismiss",
                          },
                        ],
                      },
                      trackingParams: "CAYQ8FsiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                    },
                  },
                  trackingParams: "CAUQteYDIhMIt8CQ4qS7gAMVKFh6BR3RjgoR",
                },
              },
              backButton: {
                buttonRenderer: {
                  trackingParams: "CAQQvIYDIhMIt8CQ4qS7gAMVKFh6BR3RjgoR",
                  command: {
                    clickTrackingParams: "CAQQvIYDIhMIt8CQ4qS7gAMVKFh6BR3RjgoR",
                    commandMetadata: {
                      webCommandMetadata: {
                        sendPost: true,
                      },
                    },
                    signalServiceEndpoint: {
                      signal: "CLIENT_SIGNAL",
                      actions: [
                        {
                          clickTrackingParams:
                            "CAQQvIYDIhMIt8CQ4qS7gAMVKFh6BR3RjgoR",
                          signalAction: {
                            signal: "HISTORY_BACK",
                          },
                        },
                      ],
                    },
                  },
                },
              },
              forwardButton: {
                buttonRenderer: {
                  trackingParams: "CAMQvYYDIhMIt8CQ4qS7gAMVKFh6BR3RjgoR",
                  command: {
                    clickTrackingParams: "CAMQvYYDIhMIt8CQ4qS7gAMVKFh6BR3RjgoR",
                    commandMetadata: {
                      webCommandMetadata: {
                        sendPost: true,
                      },
                    },
                    signalServiceEndpoint: {
                      signal: "CLIENT_SIGNAL",
                      actions: [
                        {
                          clickTrackingParams:
                            "CAMQvYYDIhMIt8CQ4qS7gAMVKFh6BR3RjgoR",
                          signalAction: {
                            signal: "HISTORY_FORWARD",
                          },
                        },
                      ],
                    },
                  },
                },
              },
              a11ySkipNavigationButton: {
                buttonRenderer: {
                  style: "STYLE_DEFAULT",
                  size: "SIZE_DEFAULT",
                  isDisabled: false,
                  text: {
                    runs: [
                      {
                        text: "Skip navigation",
                      },
                    ],
                  },
                  trackingParams: "CAIQ8FsiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                  command: {
                    clickTrackingParams: "CAIQ8FsiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                    commandMetadata: {
                      webCommandMetadata: {
                        sendPost: true,
                      },
                    },
                    signalServiceEndpoint: {
                      signal: "CLIENT_SIGNAL",
                      actions: [
                        {
                          clickTrackingParams:
                            "CAIQ8FsiEwi3wJDipLuAAxUoWHoFHdGOChE=",
                          signalAction: {
                            signal: "SKIP_NAVIGATION",
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
          microformat: {
            microformatDataRenderer: {
              urlCanonical:
                "https://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
              title: "Dorado Schmitt - Topic",
              description: "",
              thumbnail: {
                thumbnails: [
                  {
                    url: "https://yt3.googleusercontent.com/Y46hwYw40rv539apiOjLnGvtou0ISMsNOKr-gLhjAFImRCgM0AJL_80pgn-RXxno6Y4i0u9aMg=s200-c-k-c0x00ffffff-no-rj?days_since_epoch=19570",
                    width: 200,
                    height: 200,
                  },
                ],
              },
              siteName: "YouTube",
              appName: "YouTube",
              androidPackage: "com.google.android.youtube",
              iosAppStoreId: "544007664",
              iosAppArguments:
                "https://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
              ogType: "yt-fb-app:channel",
              urlApplinksWeb:
                "https://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw?feature=applinks",
              urlApplinksIos:
                "vnd.youtube://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw?feature=applinks",
              urlApplinksAndroid:
                "vnd.youtube://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw?feature=applinks",
              urlTwitterIos:
                "vnd.youtube://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw?feature=twitter-deep-link",
              urlTwitterAndroid:
                "vnd.youtube://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw?feature=twitter-deep-link",
              twitterCardType: "summary",
              twitterSiteHandle: "@YouTube",
              schemaDotOrgType:
                "http://schema.org/http://schema.org/YoutubeChannelV2",
              noindex: false,
              unlisted: false,
              familySafe: true,
              availableCountries: [
                "PM",
                "SD",
                "TC",
                "JE",
                "ST",
                "KE",
                "OM",
                "NG",
                "KI",
                "PS",
                "FO",
                "CW",
                "BL",
                "MY",
                "VI",
                "DO",
                "IE",
                "TZ",
                "BR",
                "GE",
                "MA",
                "BG",
                "AG",
                "JO",
                "LC",
                "MD",
                "RW",
                "SL",
                "TT",
                "IM",
                "NE",
                "VN",
                "KY",
                "GU",
                "SJ",
                "ES",
                "TJ",
                "CL",
                "PA",
                "MT",
                "TD",
                "LY",
                "GR",
                "CK",
                "SO",
                "AS",
                "ML",
                "AZ",
                "PW",
                "WF",
                "TW",
                "GB",
                "PT",
                "TF",
                "KZ",
                "TO",
                "ET",
                "UY",
                "FM",
                "GQ",
                "MH",
                "MX",
                "MN",
                "HN",
                "SM",
                "LU",
                "CD",
                "QA",
                "DZ",
                "KN",
                "SH",
                "BB",
                "GH",
                "AX",
                "TV",
                "KP",
                "LA",
                "NA",
                "NR",
                "WS",
                "RO",
                "CG",
                "PF",
                "UZ",
                "CM",
                "GI",
                "NO",
                "LB",
                "PK",
                "KW",
                "AM",
                "AU",
                "TM",
                "IN",
                "PL",
                "SG",
                "SN",
                "AT",
                "UA",
                "FR",
                "HU",
                "BA",
                "IR",
                "US",
                "LK",
                "UG",
                "NP",
                "MP",
                "SE",
                "FI",
                "MU",
                "BW",
                "MG",
                "BO",
                "AO",
                "SB",
                "EE",
                "ME",
                "MM",
                "EG",
                "MW",
                "BT",
                "BZ",
                "CC",
                "MC",
                "SV",
                "PG",
                "HR",
                "IL",
                "BJ",
                "AD",
                "GP",
                "PR",
                "EC",
                "BN",
                "DK",
                "AQ",
                "GN",
                "GL",
                "BM",
                "LV",
                "EH",
                "SS",
                "NL",
                "TL",
                "UM",
                "AR",
                "VE",
                "PY",
                "LI",
                "NU",
                "IQ",
                "PH",
                "CH",
                "SA",
                "ID",
                "SZ",
                "CX",
                "SC",
                "AI",
                "TN",
                "MK",
                "YT",
                "LT",
                "FJ",
                "MQ",
                "CF",
                "VG",
                "BQ",
                "CZ",
                "VA",
                "YE",
                "PN",
                "MS",
                "NC",
                "KR",
                "SX",
                "ER",
                "HK",
                "MV",
                "AW",
                "MR",
                "IT",
                "BS",
                "DE",
                "GA",
                "LR",
                "FK",
                "CN",
                "RE",
                "GG",
                "RS",
                "SK",
                "AF",
                "CY",
                "BE",
                "KH",
                "HT",
                "KG",
                "BD",
                "GD",
                "GY",
                "ZM",
                "CU",
                "NZ",
                "TG",
                "BH",
                "BV",
                "NF",
                "TK",
                "VU",
                "CV",
                "DJ",
                "BY",
                "SR",
                "BI",
                "VC",
                "BF",
                "GW",
                "IS",
                "ZW",
                "RU",
                "CI",
                "KM",
                "TH",
                "HM",
                "GT",
                "SI",
                "SY",
                "LS",
                "DM",
                "NI",
                "AL",
                "CA",
                "GF",
                "GS",
                "JM",
                "TR",
                "JP",
                "MZ",
                "CR",
                "GM",
                "PE",
                "CO",
                "AE",
                "IO",
                "MF",
                "MO",
                "ZA",
              ],
              linkAlternates: [
                {
                  hrefUrl:
                    "https://m.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                },
                {
                  hrefUrl:
                    "android-app://com.google.android.youtube/http/youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                },
                {
                  hrefUrl:
                    "ios-app://544007664/http/youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                },
              ],
            },
          },
        },
        xsrf_token:
          "QUFFLUhqblIxVXAzTXdZMEoxZy1qcndjNXVsZXhCRlhnZ3xBQ3Jtc0trLUlIMEJpc3BIVFBOUWRDdFdPX0xRRzNMR3FZUTJKNGhZb3BEVVZkZ21PXzNKUlpvaGt5S2VGa3dua3VvYUJTQnE1SDZicy10N29tY1MxS1hqSExpcnV6bkZVYVVvMm5tSTUtYWZobEVCc09wbFF2cw==",
        url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw/videos?flow=grid&view=0",
        endpoint: {
          clickTrackingParams: "IhMIgMqP4qS7gAMVYkR6BR0X1A3EMghleHRlcm5hbA==",
          commandMetadata: {
            webCommandMetadata: {
              url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw/videos?view=0",
              webPageType: "WEB_PAGE_TYPE_CHANNEL",
              rootVe: 3611,
              apiUrl: "/youtubei/v1/browse",
            },
          },
          browseEndpoint: {
            browseId: "UCFpzduxWbxR1P7L-ynuAtTw",
            params: "EgZ2aWRlb3MgALgBAJIDAPIGBAoCOgA%3D",
          },
        },
        timing: {
          info: {
            st: 0,
          },
        },
      },
    ],
  },
  channelIdType: 1,
} as const;

const topicPlaylistResponse = {
  status: 200,
  statusText: "OK",
  data: [
    {
      page: "channel",
      rootVe: "3611",
    },
    {
      page: "channel",
      rootVe: "3611",
      response: {
        responseContext: {
          serviceTrackingParams: [
            {
              service: "GFEEDBACK",
              params: [
                {
                  key: "route",
                  value: "channel.playlists",
                },
                {
                  key: "is_casual",
                  value: "false",
                },
                {
                  key: "is_owner",
                  value: "false",
                },
                {
                  key: "is_monetization_enabled",
                  value: "false",
                },
                {
                  key: "num_shelves",
                  value: "2",
                },
                {
                  key: "is_alc_surface",
                  value: "false",
                },
                {
                  key: "browse_id",
                  value: "UCFpzduxWbxR1P7L-ynuAtTw",
                },
                {
                  key: "browse_id_prefix",
                  value: "",
                },
                {
                  key: "logged_in",
                  value: "0",
                },
                {
                  key: "e",
                  value:
                    "23804281,23946420,23966208,23983296,23986028,23998056,24004644,24007246,24034168,24036947,24077241,24080738,24108448,24120820,24135310,24135943,24140247,24166867,24181174,24187377,24211178,24216872,24219713,24241378,24248955,24255543,24255545,24262346,24288664,24290971,24291857,24362095,24363518,24366065,24367579,24368308,24371398,24372103,24372110,24373976,24374315,24376979,24377322,24377910,24379043,24379065,24379133,24379352,24379527,24379546,24379962,24379967,24380264,24382551,24383024,24384899,24385508,24385612,24386796,24388708,24388718,24388735,24388746,24388761,24389132,24390675,24404640,24407191,24415864,24428788,24437577,24439361,24440132,24445833,24451319,24453989,24457384,24458317,24458324,24458329,24458839,24459435,24466371,24467347,24468724,24469818,24475981,24485421,24495060,24498300,24501184,24501975,24502852,24503257,24506101,24506625,24506784,24509771,24515366,24515423,24518452,24519102,24520976,24521212,24521429,24523472,24525222,24525413,24526269,24526574,24526644,24526772,24526787,24526790,24526799,24526804,24526813,24526827,24528356,24528463,24528468,24528473,24528480,24528552,24528555,24528575,24528584,24528642,24528649,24528661,24528668,24528734,24531222,24531244,24537200,24540953,24541825,24541861,24542149,24542452,24543667,24543709,24544108,24544702,24547842,24550285,24550458,24550952,24551130,24552125,24552606,24552800,24553434,24554039,24559326,24650811,24691334,24698453,24698456,24698880,24699598,24699899,39324045,39324156,39324224,39324317,39324321,39324328,39324338,39324385,39324479,39324499,39324563,51000011,51000316,51001394",
                },
              ],
            },
            {
              service: "GOOGLE_HELP",
              params: [
                {
                  key: "browse_id",
                  value: "UCFpzduxWbxR1P7L-ynuAtTw",
                },
                {
                  key: "browse_id_prefix",
                  value: "",
                },
              ],
            },
            {
              service: "CSI",
              params: [
                {
                  key: "c",
                  value: "WEB",
                },
                {
                  key: "cver",
                  value: "2.20201021.03.00",
                },
                {
                  key: "yt_li",
                  value: "0",
                },
                {
                  key: "GetChannelPage_rid",
                  value: "0x9f7531a5b0985044",
                },
              ],
            },
            {
              service: "GUIDED_HELP",
              params: [
                {
                  key: "logged_in",
                  value: "0",
                },
              ],
            },
            {
              service: "ECATCHER",
              params: [
                {
                  key: "client.version",
                  value: "2.20221122",
                },
                {
                  key: "client.name",
                  value: "WEB",
                },
                {
                  key: "client.fexp",
                  value:
                    "24528668,24385508,24219713,24187377,39324499,24528661,24389132,24371398,24550285,24290971,24077241,24519102,24458839,24526799,24388708,24552125,24372110,24698880,24140247,24553434,24528575,24080738,24004644,24415864,24372103,24698456,24526813,24241378,24363518,24255545,24526827,39324045,24528473,24407191,24544108,24386796,24554039,24467347,24379065,24458329,24550458,51000011,24506101,39324563,24506784,24388746,39324321,24384899,24528555,24525413,24699598,39324479,24526772,39324328,24528584,24377910,39324156,24262346,24255543,24379967,24440132,24528649,24506625,24502852,24388718,24531222,24367579,24458324,24475981,24528734,24388761,24528468,24379527,24036947,24451319,24501975,24550952,24501184,24543667,23998056,24498300,24552606,39324385,24552800,24542452,23986028,24428788,24531244,24007246,23983296,24469818,24544702,24135310,24385612,24458317,24542149,24485421,24373976,24377322,24466371,24528356,24526644,24540953,24691334,24390675,24528642,24518452,24445833,24521429,24520976,24543709,24135943,24699899,24541861,24248955,24541825,24537200,24523472,24526787,24374315,23946420,24383024,24551130,24698453,24453989,24526269,24439361,24379133,24468724,24528463,24376979,24547842,24509771,24379043,24503257,24379546,24368308,24291857,24388735,24211178,24526790,24379352,24526574,23804281,51000316,24437577,39324224,23966208,24525222,24528480,24495060,24526804,24528552,24108448,39324338,24034168,24404640,24362095,24457384,24459435,24515366,24166867,24650811,24380264,24379962,24366065,24181174,24521212,39324317,24382551,24216872,24288664,24515423,24559326,24120820,51001394",
                },
              ],
            },
          ],
          maxAgeSeconds: 300,
          mainAppWebResponseContext: {
            loggedOut: true,
            trackingParam:
              "kx_fmPxhoPZR_MqULZR4vd_hoaxZ7H4LUdYoo25Wo00y4NwRgkuswmIBwOcCE59TDtslLKPQ-SS",
          },
          webResponseContextExtensionData: {
            ytConfigData: {
              visitorData: "CgtwQ3NNeHNobjljUSif5Z6mBg%3D%3D",
              rootVisualElementType: 3611,
            },
            hasDecorated: true,
          },
        },
        contents: {
          twoColumnBrowseResultsRenderer: {
            tabs: [
              {
                tabRenderer: {
                  endpoint: {
                    clickTrackingParams:
                      "CBUQ8JMBGAUiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                    commandMetadata: {
                      webCommandMetadata: {
                        url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw/featured",
                        webPageType: "WEB_PAGE_TYPE_CHANNEL",
                        rootVe: 3611,
                        apiUrl: "/youtubei/v1/browse",
                      },
                    },
                    browseEndpoint: {
                      browseId: "UCFpzduxWbxR1P7L-ynuAtTw",
                      params: "EghmZWF0dXJlZPIGBAoCMgA%3D",
                      canonicalBaseUrl: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                    },
                  },
                  title: "Home",
                  trackingParams: "CBUQ8JMBGAUiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                },
              },
              {
                tabRenderer: {
                  endpoint: {
                    clickTrackingParams:
                      "CBEQ8JMBGAYiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                    commandMetadata: {
                      webCommandMetadata: {
                        url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw/playlists",
                        webPageType: "WEB_PAGE_TYPE_CHANNEL",
                        rootVe: 3611,
                        apiUrl: "/youtubei/v1/browse",
                      },
                    },
                    browseEndpoint: {
                      browseId: "UCFpzduxWbxR1P7L-ynuAtTw",
                      params: "EglwbGF5bGlzdHPyBgQKAkIA",
                      canonicalBaseUrl: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                    },
                  },
                  title: "Playlists",
                  selected: true,
                  content: {
                    sectionListRenderer: {
                      contents: [
                        {
                          itemSectionRenderer: {
                            contents: [
                              {
                                messageRenderer: {
                                  text: {
                                    simpleText:
                                      "This channel has no playlists.",
                                  },
                                  trackingParams:
                                    "CBQQljsYACITCPKStqqCuYADFWbTEQgdKzkGOQ==",
                                },
                              },
                            ],
                            trackingParams:
                              "CBMQuy8YACITCPKStqqCuYADFWbTEQgdKzkGOQ==",
                          },
                        },
                      ],
                      trackingParams: "CBIQui8iEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                      disablePullToRefresh: true,
                    },
                  },
                  trackingParams: "CBEQ8JMBGAYiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                },
              },
              {
                tabRenderer: {
                  endpoint: {
                    clickTrackingParams:
                      "CBAQ8JMBGAciEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                    commandMetadata: {
                      webCommandMetadata: {
                        url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw/about",
                        webPageType: "WEB_PAGE_TYPE_CHANNEL",
                        rootVe: 3611,
                        apiUrl: "/youtubei/v1/browse",
                      },
                    },
                    browseEndpoint: {
                      browseId: "UCFpzduxWbxR1P7L-ynuAtTw",
                      params: "EgVhYm91dPIGBAoCEgA%3D",
                      canonicalBaseUrl: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                    },
                  },
                  title: "About",
                  trackingParams: "CBAQ8JMBGAciEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                },
              },
            ],
          },
        },
        header: {
          c4TabbedHeaderRenderer: {
            channelId: "UCFpzduxWbxR1P7L-ynuAtTw",
            title: "Dorado Schmitt - Topic",
            navigationEndpoint: {
              clickTrackingParams: "CA0Q8DsiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
              commandMetadata: {
                webCommandMetadata: {
                  url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                  webPageType: "WEB_PAGE_TYPE_CHANNEL",
                  rootVe: 3611,
                  apiUrl: "/youtubei/v1/browse",
                },
              },
              browseEndpoint: {
                browseId: "UCFpzduxWbxR1P7L-ynuAtTw",
                canonicalBaseUrl: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
              },
            },
            avatar: {
              thumbnails: [
                {
                  url: "https://yt3.googleusercontent.com/Y46hwYw40rv539apiOjLnGvtou0ISMsNOKr-gLhjAFImRCgM0AJL_80pgn-RXxno6Y4i0u9aMg=s48-c-k-c0x00ffffff-no-rj",
                  width: 48,
                  height: 48,
                },
                {
                  url: "https://yt3.googleusercontent.com/Y46hwYw40rv539apiOjLnGvtou0ISMsNOKr-gLhjAFImRCgM0AJL_80pgn-RXxno6Y4i0u9aMg=s88-c-k-c0x00ffffff-no-rj",
                  width: 88,
                  height: 88,
                },
                {
                  url: "https://yt3.googleusercontent.com/Y46hwYw40rv539apiOjLnGvtou0ISMsNOKr-gLhjAFImRCgM0AJL_80pgn-RXxno6Y4i0u9aMg=s176-c-k-c0x00ffffff-no-rj",
                  width: 176,
                  height: 176,
                },
              ],
            },
            banner: {
              thumbnails: [
                {
                  url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w1060-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
                  width: 1060,
                  height: 175,
                },
                {
                  url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w1138-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
                  width: 1138,
                  height: 188,
                },
                {
                  url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
                  width: 1707,
                  height: 283,
                },
                {
                  url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
                  width: 2120,
                  height: 351,
                },
                {
                  url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w2276-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
                  width: 2276,
                  height: 377,
                },
                {
                  url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
                  width: 2560,
                  height: 424,
                },
              ],
            },
            subscribeButton: {
              buttonRenderer: {
                style: "STYLE_DESTRUCTIVE",
                size: "SIZE_DEFAULT",
                isDisabled: false,
                text: {
                  runs: [
                    {
                      text: "Subscribe",
                    },
                  ],
                },
                navigationEndpoint: {
                  clickTrackingParams: "CA4Q8FsiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                  commandMetadata: {
                    webCommandMetadata: {
                      ignoreNavigation: true,
                    },
                  },
                  modalEndpoint: {
                    modal: {
                      modalWithTitleAndButtonRenderer: {
                        title: {
                          simpleText: "Want to subscribe to this channel?",
                        },
                        content: {
                          simpleText: "Sign in to subscribe to this channel.",
                        },
                        button: {
                          buttonRenderer: {
                            style: "STYLE_BLUE_TEXT",
                            size: "SIZE_DEFAULT",
                            isDisabled: false,
                            text: {
                              simpleText: "Sign in",
                            },
                            navigationEndpoint: {
                              clickTrackingParams:
                                "CA8Q_YYEIhMI8pK2qoK5gAMVZtMRCB0rOQY5MglzdWJzY3JpYmU=",
                              commandMetadata: {
                                webCommandMetadata: {
                                  url: "https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3D%252Fchannel%252FUCFpzduxWbxR1P7L-ynuAtTw%252Fplaylists%26continue_action%3DQUFFLUhqbjJNenpKYVg2Z3Y4cWJfak9MWEp5Z2dYSkRsUXxBQ3Jtc0tteWlsX1BqVUo3NksxdXlaaFZQX05kZG5WVllsd3ZfUXMwbVpRUHdUUkNnMnE5T3BfRVBNNDdtbTVxZG9KMm1DanREQ2w1c0w0ei1qSGExLUpmd2tjeDZvTS0yaEFodTRnX2hBcHZaRVVZQm1DSkpSb2pzcTktRFhtb1VpVi1CaHFjVkVGQTB4Q245WFZPRmJmeXJaRGJSeXF4OVItdWZkNjc1dkhSa1ZGcTZrOFhSQ3A4OWUxcTJieTRId0gtWl9sNkFCMFg&hl=en&ec=66429",
                                  webPageType: "WEB_PAGE_TYPE_UNKNOWN",
                                  rootVe: 83769,
                                },
                              },
                              signInEndpoint: {
                                nextEndpoint: {
                                  clickTrackingParams:
                                    "CA8Q_YYEIhMI8pK2qoK5gAMVZtMRCB0rOQY5",
                                  commandMetadata: {
                                    webCommandMetadata: {
                                      url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw/playlists",
                                      webPageType: "WEB_PAGE_TYPE_CHANNEL",
                                      rootVe: 3611,
                                      apiUrl: "/youtubei/v1/browse",
                                    },
                                  },
                                  browseEndpoint: {
                                    browseId: "UCFpzduxWbxR1P7L-ynuAtTw",
                                    params: "EglwbGF5bGlzdHM%3D",
                                    canonicalBaseUrl:
                                      "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                                  },
                                },
                                continueAction:
                                  "QUFFLUhqbjJNenpKYVg2Z3Y4cWJfak9MWEp5Z2dYSkRsUXxBQ3Jtc0tteWlsX1BqVUo3NksxdXlaaFZQX05kZG5WVllsd3ZfUXMwbVpRUHdUUkNnMnE5T3BfRVBNNDdtbTVxZG9KMm1DanREQ2w1c0w0ei1qSGExLUpmd2tjeDZvTS0yaEFodTRnX2hBcHZaRVVZQm1DSkpSb2pzcTktRFhtb1VpVi1CaHFjVkVGQTB4Q245WFZPRmJmeXJaRGJSeXF4OVItdWZkNjc1dkhSa1ZGcTZrOFhSQ3A4OWUxcTJieTRId0gtWl9sNkFCMFg",
                                idamTag: "66429",
                              },
                            },
                            trackingParams:
                              "CA8Q_YYEIhMI8pK2qoK5gAMVZtMRCB0rOQY5",
                          },
                        },
                      },
                    },
                  },
                },
                trackingParams: "CA4Q8FsiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
              },
            },
            subscriberCountText: {
              accessibility: {
                accessibilityData: {
                  label: "534 subscribers",
                },
              },
              simpleText: "534 subscribers",
            },
            tvBanner: {
              thumbnails: [
                {
                  url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w320-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj",
                  width: 320,
                  height: 180,
                },
                {
                  url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w854-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj",
                  width: 854,
                  height: 480,
                },
                {
                  url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w1280-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj",
                  width: 1280,
                  height: 720,
                },
                {
                  url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w1920-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj",
                  width: 1920,
                  height: 1080,
                },
                {
                  url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w2120-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj",
                  width: 2120,
                  height: 1192,
                },
              ],
            },
            mobileBanner: {
              thumbnails: [
                {
                  url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w320-fcrop64=1,32b75a57cd48a5a8-k-c0xffffffff-no-nd-rj",
                  width: 320,
                  height: 88,
                },
                {
                  url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w640-fcrop64=1,32b75a57cd48a5a8-k-c0xffffffff-no-nd-rj",
                  width: 640,
                  height: 175,
                },
                {
                  url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w960-fcrop64=1,32b75a57cd48a5a8-k-c0xffffffff-no-nd-rj",
                  width: 960,
                  height: 263,
                },
                {
                  url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w1280-fcrop64=1,32b75a57cd48a5a8-k-c0xffffffff-no-nd-rj",
                  width: 1280,
                  height: 351,
                },
                {
                  url: "https://yt3.googleusercontent.com/IOtYDYOsq2bQhYDWTSXD0M4RMtrG0i6cv_faZys3B8JYa6asTtCnbp0waaFUZKs9PsNHj-iORbs=w1440-fcrop64=1,32b75a57cd48a5a8-k-c0xffffffff-no-nd-rj",
                  width: 1440,
                  height: 395,
                },
              ],
            },
            trackingParams: "CA0Q8DsiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
            style: "C4_TABBED_HEADER_RENDERER_STYLE_MODERN",
            videosCountText: {
              runs: [
                {
                  text: "76",
                },
                {
                  text: " videos",
                },
              ],
            },
            tagline: {
              channelTaglineRenderer: {
                content: "More about this channel",
                maxLines: 1,
                moreLabel: "... more",
                moreEndpoint: {
                  clickTrackingParams: "CA0Q8DsiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                  commandMetadata: {
                    webCommandMetadata: {
                      url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw/about",
                      webPageType: "WEB_PAGE_TYPE_CHANNEL",
                      rootVe: 3611,
                      apiUrl: "/youtubei/v1/browse",
                    },
                  },
                  browseEndpoint: {
                    browseId: "UCFpzduxWbxR1P7L-ynuAtTw",
                    params: "EgVhYm91dPIGBAoCEgA%3D",
                    canonicalBaseUrl: "/channel/UCFpzduxWbxR1P7L-ynuAtTw",
                  },
                },
                moreIcon: {
                  iconType: "CHEVRON_RIGHT",
                },
              },
            },
          },
        },
        metadata: {
          channelMetadataRenderer: {
            title: "Dorado Schmitt - Topic",
            description: "",
            rssUrl:
              "https://www.youtube.com/feeds/videos.xml?channel_id=UCFpzduxWbxR1P7L-ynuAtTw",
            externalId: "UCFpzduxWbxR1P7L-ynuAtTw",
            keywords: "",
            ownerUrls: [
              "http://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
            ],
            avatar: {
              thumbnails: [
                {
                  url: "https://yt3.googleusercontent.com/Y46hwYw40rv539apiOjLnGvtou0ISMsNOKr-gLhjAFImRCgM0AJL_80pgn-RXxno6Y4i0u9aMg=s900-c-k-c0x00ffffff-no-rj",
                  width: 900,
                  height: 900,
                },
              ],
            },
            channelUrl:
              "https://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
            isFamilySafe: true,
            availableCountryCodes: [
              "TK",
              "MQ",
              "YE",
              "FI",
              "HM",
              "LS",
              "BS",
              "SY",
              "AL",
              "JM",
              "ID",
              "DJ",
              "EE",
              "IN",
              "SM",
              "BM",
              "ML",
              "BB",
              "KE",
              "GY",
              "BL",
              "EG",
              "MA",
              "MS",
              "BD",
              "SL",
              "TR",
              "VA",
              "PE",
              "SX",
              "AE",
              "AZ",
              "MG",
              "CF",
              "AU",
              "EH",
              "IM",
              "JP",
              "IT",
              "QA",
              "NR",
              "TW",
              "GA",
              "VU",
              "AF",
              "BN",
              "BZ",
              "GM",
              "MN",
              "AS",
              "GD",
              "BO",
              "FM",
              "MD",
              "CX",
              "AT",
              "KI",
              "CY",
              "FR",
              "TM",
              "GI",
              "IR",
              "PA",
              "BA",
              "BW",
              "HT",
              "TG",
              "CO",
              "RO",
              "VI",
              "BY",
              "FO",
              "PN",
              "GW",
              "NG",
              "NO",
              "MU",
              "AX",
              "SA",
              "RE",
              "GQ",
              "BR",
              "ZM",
              "ZW",
              "CH",
              "MK",
              "PR",
              "UA",
              "CN",
              "GN",
              "TN",
              "GL",
              "KN",
              "SO",
              "ME",
              "NI",
              "GG",
              "HU",
              "GU",
              "HR",
              "ZA",
              "HK",
              "PT",
              "CM",
              "KM",
              "OM",
              "PY",
              "LB",
              "RS",
              "UY",
              "KH",
              "MW",
              "SH",
              "DM",
              "IE",
              "KP",
              "CI",
              "VE",
              "AG",
              "KZ",
              "TF",
              "MO",
              "CV",
              "IQ",
              "PW",
              "TZ",
              "CK",
              "TO",
              "TT",
              "YT",
              "SN",
              "GE",
              "GP",
              "PG",
              "PH",
              "MH",
              "SK",
              "DE",
              "UZ",
              "LV",
              "MY",
              "JO",
              "EC",
              "KW",
              "LI",
              "TH",
              "CG",
              "UM",
              "KY",
              "MF",
              "GB",
              "IO",
              "BE",
              "MP",
              "GR",
              "AI",
              "CC",
              "NZ",
              "NF",
              "PF",
              "CU",
              "LT",
              "PS",
              "SD",
              "GT",
              "CW",
              "SG",
              "LR",
              "BQ",
              "UG",
              "CA",
              "KR",
              "NA",
              "ER",
              "AW",
              "AQ",
              "NL",
              "CR",
              "SC",
              "JE",
              "TL",
              "TJ",
              "SJ",
              "BG",
              "FJ",
              "GS",
              "HN",
              "BV",
              "DO",
              "AO",
              "LK",
              "WF",
              "SZ",
              "LC",
              "MM",
              "SI",
              "MZ",
              "DZ",
              "KG",
              "PL",
              "MC",
              "VC",
              "BJ",
              "VG",
              "SS",
              "IL",
              "MV",
              "NU",
              "FK",
              "NE",
              "SV",
              "IS",
              "BF",
              "GH",
              "RU",
              "RW",
              "BH",
              "SB",
              "WS",
              "AM",
              "ET",
              "CZ",
              "NC",
              "GF",
              "CD",
              "ES",
              "SR",
              "LU",
              "NP",
              "LY",
              "TC",
              "SE",
              "DK",
              "CL",
              "PK",
              "BT",
              "TD",
              "PM",
              "ST",
              "US",
              "AR",
              "LA",
              "VN",
              "AD",
              "TV",
              "MX",
              "MR",
              "MT",
              "BI",
            ],
            musicArtistName: "Dorado Schmitt",
            androidDeepLink:
              "android-app://com.google.android.youtube/http/www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
            androidAppindexingLink:
              "android-app://com.google.android.youtube/http/www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
            iosAppindexingLink:
              "ios-app://544007664/vnd.youtube/www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
            vanityChannelUrl:
              "http://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
          },
        },
        trackingParams: "CAAQhGciEwjykraqgrmAAxVm0xEIHSs5Bjk=",
        topbar: {
          desktopTopbarRenderer: {
            logo: {
              topbarLogoRenderer: {
                iconImage: {
                  iconType: "YOUTUBE_LOGO",
                },
                tooltipText: {
                  runs: [
                    {
                      text: "YouTube Home",
                    },
                  ],
                },
                endpoint: {
                  clickTrackingParams: "CAwQsV4iEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                  commandMetadata: {
                    webCommandMetadata: {
                      url: "/",
                      webPageType: "WEB_PAGE_TYPE_BROWSE",
                      rootVe: 3854,
                      apiUrl: "/youtubei/v1/browse",
                    },
                  },
                  browseEndpoint: {
                    browseId: "FEwhat_to_watch",
                  },
                },
                trackingParams: "CAwQsV4iEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                overrideEntityKey: "EgZ0b3BiYXIg9QEoAQ%3D%3D",
              },
            },
            searchbox: {
              fusionSearchboxRenderer: {
                icon: {
                  iconType: "SEARCH",
                },
                placeholderText: {
                  runs: [
                    {
                      text: "Search",
                    },
                  ],
                },
                config: {
                  webSearchboxConfig: {
                    requestLanguage: "en",
                    requestDomain: "hr",
                    hasOnscreenKeyboard: false,
                    focusSearchbox: true,
                  },
                },
                trackingParams: "CAoQ7VAiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                searchEndpoint: {
                  clickTrackingParams: "CAoQ7VAiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                  commandMetadata: {
                    webCommandMetadata: {
                      url: "/results?search_query=",
                      webPageType: "WEB_PAGE_TYPE_SEARCH",
                      rootVe: 4724,
                    },
                  },
                  searchEndpoint: {
                    query: "",
                  },
                },
                clearButton: {
                  buttonRenderer: {
                    style: "STYLE_DEFAULT",
                    size: "SIZE_DEFAULT",
                    isDisabled: false,
                    icon: {
                      iconType: "CLOSE",
                    },
                    trackingParams: "CAsQ8FsiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                    accessibilityData: {
                      accessibilityData: {
                        label: "Clear search query",
                      },
                    },
                  },
                },
              },
            },
            trackingParams: "CAEQq6wBIhMI8pK2qoK5gAMVZtMRCB0rOQY5",
            countryCode: "HR",
            topbarButtons: [
              {
                topbarMenuButtonRenderer: {
                  icon: {
                    iconType: "MORE_VERT",
                  },
                  menuRequest: {
                    clickTrackingParams:
                      "CAgQ_qsBGAAiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                    commandMetadata: {
                      webCommandMetadata: {
                        sendPost: true,
                        apiUrl: "/youtubei/v1/account/account_menu",
                      },
                    },
                    signalServiceEndpoint: {
                      signal: "GET_ACCOUNT_MENU",
                      actions: [
                        {
                          clickTrackingParams:
                            "CAgQ_qsBGAAiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                          openPopupAction: {
                            popup: {
                              multiPageMenuRenderer: {
                                trackingParams:
                                  "CAkQ_6sBIhMI8pK2qoK5gAMVZtMRCB0rOQY5",
                                style: "MULTI_PAGE_MENU_STYLE_TYPE_SYSTEM",
                                showLoadingSpinner: true,
                              },
                            },
                            popupType: "DROPDOWN",
                            beReused: true,
                          },
                        },
                      ],
                    },
                  },
                  trackingParams: "CAgQ_qsBGAAiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                  accessibility: {
                    accessibilityData: {
                      label: "Settings",
                    },
                  },
                  tooltip: "Settings",
                  style: "STYLE_DEFAULT",
                },
              },
              {
                buttonRenderer: {
                  style: "STYLE_SUGGESTIVE",
                  size: "SIZE_SMALL",
                  text: {
                    runs: [
                      {
                        text: "Sign in",
                      },
                    ],
                  },
                  icon: {
                    iconType: "AVATAR_LOGGED_OUT",
                  },
                  navigationEndpoint: {
                    clickTrackingParams:
                      "CAcQ1IAEGAEiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                    commandMetadata: {
                      webCommandMetadata: {
                        url: "https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252Fchannel%252FUCFpzduxWbxR1P7L-ynuAtTw%252Fplaylists%253Fview%253D1%2526sort%253Ddd%2526flow%253Dgrid&hl=en&ec=65620",
                        webPageType: "WEB_PAGE_TYPE_UNKNOWN",
                        rootVe: 83769,
                      },
                    },
                    signInEndpoint: {
                      idamTag: "65620",
                    },
                  },
                  trackingParams: "CAcQ1IAEGAEiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                  targetId: "topbar-signin",
                },
              },
            ],
            hotkeyDialog: {
              hotkeyDialogRenderer: {
                title: {
                  runs: [
                    {
                      text: "Keyboard shortcuts",
                    },
                  ],
                },
                sections: [
                  {
                    hotkeyDialogSectionRenderer: {
                      title: {
                        runs: [
                          {
                            text: "Playback",
                          },
                        ],
                      },
                      options: [
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Toggle play/pause",
                                },
                              ],
                            },
                            hotkey: "k",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Rewind 10 seconds",
                                },
                              ],
                            },
                            hotkey: "j",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Fast forward 10 seconds",
                                },
                              ],
                            },
                            hotkey: "l",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Previous video",
                                },
                              ],
                            },
                            hotkey: "P (SHIFT+p)",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Next video",
                                },
                              ],
                            },
                            hotkey: "N (SHIFT+n)",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Previous frame (while paused)",
                                },
                              ],
                            },
                            hotkey: ",",
                            hotkeyAccessibilityLabel: {
                              accessibilityData: {
                                label: "Comma",
                              },
                            },
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Next frame (while paused)",
                                },
                              ],
                            },
                            hotkey: ".",
                            hotkeyAccessibilityLabel: {
                              accessibilityData: {
                                label: "Period",
                              },
                            },
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Decrease playback rate",
                                },
                              ],
                            },
                            hotkey: "< (SHIFT+,)",
                            hotkeyAccessibilityLabel: {
                              accessibilityData: {
                                label: "Less than or SHIFT + comma",
                              },
                            },
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Increase playback rate",
                                },
                              ],
                            },
                            hotkey: "> (SHIFT+.)",
                            hotkeyAccessibilityLabel: {
                              accessibilityData: {
                                label: "Greater than or SHIFT + period",
                              },
                            },
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Seek to specific point in the video (7 advances to 70% of duration)",
                                },
                              ],
                            },
                            hotkey: "0..9",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Seek to previous chapter",
                                },
                              ],
                            },
                            hotkey: "CONTROL + ←",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Seek to next chapter",
                                },
                              ],
                            },
                            hotkey: "CONTROL + →",
                          },
                        },
                      ],
                    },
                  },
                  {
                    hotkeyDialogSectionRenderer: {
                      title: {
                        runs: [
                          {
                            text: "General",
                          },
                        ],
                      },
                      options: [
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Toggle full screen",
                                },
                              ],
                            },
                            hotkey: "f",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Toggle theater mode",
                                },
                              ],
                            },
                            hotkey: "t",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Toggle miniplayer",
                                },
                              ],
                            },
                            hotkey: "i",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Close miniplayer or current dialog",
                                },
                              ],
                            },
                            hotkey: "ESCAPE",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Toggle mute",
                                },
                              ],
                            },
                            hotkey: "m",
                          },
                        },
                      ],
                    },
                  },
                  {
                    hotkeyDialogSectionRenderer: {
                      title: {
                        runs: [
                          {
                            text: "Subtitles and closed captions",
                          },
                        ],
                      },
                      options: [
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "If the video supports captions, toggle captions ON/OFF",
                                },
                              ],
                            },
                            hotkey: "c",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Rotate through different text opacity levels",
                                },
                              ],
                            },
                            hotkey: "o",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Rotate through different window opacity levels",
                                },
                              ],
                            },
                            hotkey: "w",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Rotate through font sizes (increasing)",
                                },
                              ],
                            },
                            hotkey: "+",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Rotate through font sizes (decreasing)",
                                },
                              ],
                            },
                            hotkey: "-",
                            hotkeyAccessibilityLabel: {
                              accessibilityData: {
                                label: "Minus",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                  {
                    hotkeyDialogSectionRenderer: {
                      title: {
                        runs: [
                          {
                            text: "Spherical Videos",
                          },
                        ],
                      },
                      options: [
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Pan up",
                                },
                              ],
                            },
                            hotkey: "w",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Pan left",
                                },
                              ],
                            },
                            hotkey: "a",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Pan down",
                                },
                              ],
                            },
                            hotkey: "s",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Pan right",
                                },
                              ],
                            },
                            hotkey: "d",
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Zoom in",
                                },
                              ],
                            },
                            hotkey: "+ on numpad or ]",
                            hotkeyAccessibilityLabel: {
                              accessibilityData: {
                                label: "Plus on number pad or right bracket",
                              },
                            },
                          },
                        },
                        {
                          hotkeyDialogSectionOptionRenderer: {
                            label: {
                              runs: [
                                {
                                  text: "Zoom out",
                                },
                              ],
                            },
                            hotkey: "- on numpad or [",
                            hotkeyAccessibilityLabel: {
                              accessibilityData: {
                                label: "Minus on number pad or left bracket",
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
                dismissButton: {
                  buttonRenderer: {
                    style: "STYLE_BLUE_TEXT",
                    size: "SIZE_DEFAULT",
                    isDisabled: false,
                    text: {
                      runs: [
                        {
                          text: "Dismiss",
                        },
                      ],
                    },
                    trackingParams: "CAYQ8FsiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                  },
                },
                trackingParams: "CAUQteYDIhMI8pK2qoK5gAMVZtMRCB0rOQY5",
              },
            },
            backButton: {
              buttonRenderer: {
                trackingParams: "CAQQvIYDIhMI8pK2qoK5gAMVZtMRCB0rOQY5",
                command: {
                  clickTrackingParams: "CAQQvIYDIhMI8pK2qoK5gAMVZtMRCB0rOQY5",
                  commandMetadata: {
                    webCommandMetadata: {
                      sendPost: true,
                    },
                  },
                  signalServiceEndpoint: {
                    signal: "CLIENT_SIGNAL",
                    actions: [
                      {
                        clickTrackingParams:
                          "CAQQvIYDIhMI8pK2qoK5gAMVZtMRCB0rOQY5",
                        signalAction: {
                          signal: "HISTORY_BACK",
                        },
                      },
                    ],
                  },
                },
              },
            },
            forwardButton: {
              buttonRenderer: {
                trackingParams: "CAMQvYYDIhMI8pK2qoK5gAMVZtMRCB0rOQY5",
                command: {
                  clickTrackingParams: "CAMQvYYDIhMI8pK2qoK5gAMVZtMRCB0rOQY5",
                  commandMetadata: {
                    webCommandMetadata: {
                      sendPost: true,
                    },
                  },
                  signalServiceEndpoint: {
                    signal: "CLIENT_SIGNAL",
                    actions: [
                      {
                        clickTrackingParams:
                          "CAMQvYYDIhMI8pK2qoK5gAMVZtMRCB0rOQY5",
                        signalAction: {
                          signal: "HISTORY_FORWARD",
                        },
                      },
                    ],
                  },
                },
              },
            },
            a11ySkipNavigationButton: {
              buttonRenderer: {
                style: "STYLE_DEFAULT",
                size: "SIZE_DEFAULT",
                isDisabled: false,
                text: {
                  runs: [
                    {
                      text: "Skip navigation",
                    },
                  ],
                },
                trackingParams: "CAIQ8FsiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                command: {
                  clickTrackingParams: "CAIQ8FsiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                  commandMetadata: {
                    webCommandMetadata: {
                      sendPost: true,
                    },
                  },
                  signalServiceEndpoint: {
                    signal: "CLIENT_SIGNAL",
                    actions: [
                      {
                        clickTrackingParams:
                          "CAIQ8FsiEwjykraqgrmAAxVm0xEIHSs5Bjk=",
                        signalAction: {
                          signal: "SKIP_NAVIGATION",
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        microformat: {
          microformatDataRenderer: {
            urlCanonical:
              "https://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
            title: "Dorado Schmitt - Topic",
            description: "",
            thumbnail: {
              thumbnails: [
                {
                  url: "https://yt3.googleusercontent.com/Y46hwYw40rv539apiOjLnGvtou0ISMsNOKr-gLhjAFImRCgM0AJL_80pgn-RXxno6Y4i0u9aMg=s200-c-k-c0x00ffffff-no-rj?days_since_epoch=19569",
                  width: 200,
                  height: 200,
                },
              ],
            },
            siteName: "YouTube",
            appName: "YouTube",
            androidPackage: "com.google.android.youtube",
            iosAppStoreId: "544007664",
            iosAppArguments:
              "https://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
            ogType: "yt-fb-app:channel",
            urlApplinksWeb:
              "https://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw?feature=applinks",
            urlApplinksIos:
              "vnd.youtube://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw?feature=applinks",
            urlApplinksAndroid:
              "vnd.youtube://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw?feature=applinks",
            urlTwitterIos:
              "vnd.youtube://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw?feature=twitter-deep-link",
            urlTwitterAndroid:
              "vnd.youtube://www.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw?feature=twitter-deep-link",
            twitterCardType: "summary",
            twitterSiteHandle: "@YouTube",
            schemaDotOrgType:
              "http://schema.org/http://schema.org/YoutubeChannelV2",
            noindex: false,
            unlisted: false,
            familySafe: true,
            availableCountries: [
              "TK",
              "MQ",
              "YE",
              "FI",
              "HM",
              "LS",
              "BS",
              "SY",
              "AL",
              "JM",
              "ID",
              "DJ",
              "EE",
              "IN",
              "SM",
              "BM",
              "ML",
              "BB",
              "KE",
              "GY",
              "BL",
              "EG",
              "MA",
              "MS",
              "BD",
              "SL",
              "TR",
              "VA",
              "PE",
              "SX",
              "AE",
              "AZ",
              "MG",
              "CF",
              "AU",
              "EH",
              "IM",
              "JP",
              "IT",
              "QA",
              "NR",
              "TW",
              "GA",
              "VU",
              "AF",
              "BN",
              "BZ",
              "GM",
              "MN",
              "AS",
              "GD",
              "BO",
              "FM",
              "MD",
              "CX",
              "AT",
              "KI",
              "CY",
              "FR",
              "TM",
              "GI",
              "IR",
              "PA",
              "BA",
              "BW",
              "HT",
              "TG",
              "CO",
              "RO",
              "VI",
              "BY",
              "FO",
              "PN",
              "GW",
              "NG",
              "NO",
              "MU",
              "AX",
              "SA",
              "RE",
              "GQ",
              "BR",
              "ZM",
              "ZW",
              "CH",
              "MK",
              "PR",
              "UA",
              "CN",
              "GN",
              "TN",
              "GL",
              "KN",
              "SO",
              "ME",
              "NI",
              "GG",
              "HU",
              "GU",
              "HR",
              "ZA",
              "HK",
              "PT",
              "CM",
              "KM",
              "OM",
              "PY",
              "LB",
              "RS",
              "UY",
              "KH",
              "MW",
              "SH",
              "DM",
              "IE",
              "KP",
              "CI",
              "VE",
              "AG",
              "KZ",
              "TF",
              "MO",
              "CV",
              "IQ",
              "PW",
              "TZ",
              "CK",
              "TO",
              "TT",
              "YT",
              "SN",
              "GE",
              "GP",
              "PG",
              "PH",
              "MH",
              "SK",
              "DE",
              "UZ",
              "LV",
              "MY",
              "JO",
              "EC",
              "KW",
              "LI",
              "TH",
              "CG",
              "UM",
              "KY",
              "MF",
              "GB",
              "IO",
              "BE",
              "MP",
              "GR",
              "AI",
              "CC",
              "NZ",
              "NF",
              "PF",
              "CU",
              "LT",
              "PS",
              "SD",
              "GT",
              "CW",
              "SG",
              "LR",
              "BQ",
              "UG",
              "CA",
              "KR",
              "NA",
              "ER",
              "AW",
              "AQ",
              "NL",
              "CR",
              "SC",
              "JE",
              "TL",
              "TJ",
              "SJ",
              "BG",
              "FJ",
              "GS",
              "HN",
              "BV",
              "DO",
              "AO",
              "LK",
              "WF",
              "SZ",
              "LC",
              "MM",
              "SI",
              "MZ",
              "DZ",
              "KG",
              "PL",
              "MC",
              "VC",
              "BJ",
              "VG",
              "SS",
              "IL",
              "MV",
              "NU",
              "FK",
              "NE",
              "SV",
              "IS",
              "BF",
              "GH",
              "RU",
              "RW",
              "BH",
              "SB",
              "WS",
              "AM",
              "ET",
              "CZ",
              "NC",
              "GF",
              "CD",
              "ES",
              "SR",
              "LU",
              "NP",
              "LY",
              "TC",
              "SE",
              "DK",
              "CL",
              "PK",
              "BT",
              "TD",
              "PM",
              "ST",
              "US",
              "AR",
              "LA",
              "VN",
              "AD",
              "TV",
              "MX",
              "MR",
              "MT",
              "BI",
            ],
            linkAlternates: [
              {
                hrefUrl:
                  "https://m.youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
              },
              {
                hrefUrl:
                  "android-app://com.google.android.youtube/http/youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
              },
              {
                hrefUrl:
                  "ios-app://544007664/http/youtube.com/channel/UCFpzduxWbxR1P7L-ynuAtTw",
              },
            ],
          },
        },
      },
      xsrf_token:
        "QUFFLUhqa25rN1VDM0ZKMUk2cEUtTlNTRlVYMGtIR05Sd3xBQ3Jtc0trcjNBaFpJMGRDeURQdTd4cHdTVENDTFIzSjlySVhWV3VBbklRZXFzTkljZ1JFQXlFQl8zLUFvTy1MVFVXdkRheC1Kc3VTX1FtcGtwWFIyVlJUTWtTeWRkWjBacWdXdXIwWkZWc0hZYkNqdE9STUVwdw==",
      url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw/playlists?view=1&sort=dd&flow=grid",
      endpoint: {
        clickTrackingParams: "IhMIlYm1qoK5gAMVR41VCh0LCA9AMghleHRlcm5hbA==",
        commandMetadata: {
          webCommandMetadata: {
            url: "/channel/UCFpzduxWbxR1P7L-ynuAtTw/playlists?view=1&sort=dd",
            webPageType: "WEB_PAGE_TYPE_CHANNEL",
            rootVe: 3611,
            apiUrl: "/youtubei/v1/browse",
          },
        },
        browseEndpoint: {
          browseId: "UCFpzduxWbxR1P7L-ynuAtTw",
          params: "EglwbGF5bGlzdHMYAyABuAEAkgMA8gYECgJCAA%3D%3D",
        },
      },
      timing: {
        info: {
          st: 0,
        },
      },
    },
  ],
} as const;
