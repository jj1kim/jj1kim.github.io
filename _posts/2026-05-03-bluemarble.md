---
title: '온라인 부루마블을 만들었습니다 [KR/EN]'
date: 2026-05-03
permalink: /posts/2026/05/03/bluemarble
tags:
  - Thoughts
  - Computer
excerpt: 'A retrospective on developing a P2P web-based board game with Claude'
bilingual: true
---
<div style="display: inline-block; padding: 0.3em 0.7em; background-color: #f0f0f0; border-radius: 4px; font-weight: bold; margin: 1em 0; font-size: 0.9em; color: #000 !important;">한국어</div>

안녕하세요. 오랜만에 블로그를 올립니다. 여전히 요즘도 열심히 연구하면서, 종종 시간이 남을 때마다 클로드와 함께 ＂어떤 재밌는 걸 해볼까＂ 고민하는 삶을 살고 있습니다.

# 서론

전 어렸을 때부터 보드게임 ＂부루마블＂을 참 좋아했는데요, 아마 한국인이라면 이 보드게임을 모르시는 분은 없을 것이라고 감히 예상해보겠습니다. 만약 한국인이 아니시라면... 모노폴리와 매우 비슷한 형태의 보드게임이며 한국에서 아주 유명하다고 이해해주시면 됩니다. 열 살 무렵에 부모님께서 부루마블을 사주신 이후로, 같이 게임을 해달라고 가족들을 참 많이도 괴롭혔습니다. 다만 부루마블이 게임 한 판을 하는데 적지 않은 시간이 있어야 하는지라, 가족들은 오히려 꺼렸습니다. 

나이를 먹고 나니 저 또한 여유롭게만 시간을 보낼 수는 없게 되었고, 부루마블은 잠시 제 기억에서 잊혀갔습니다. 이 틈을 타서 부모님은 집에 있던 부루마블을 버리시더군요. 이 때문에 종종 부루마블이 생각나더라도, 집에 게임판이 없으니 도통 해볼 수가 없었습니다. 인터넷을 통해서 하는 방법을 찾아보려고 해도, 유일한 방법이자 그나마 비슷한 방법은 망할 대로 망해버린 모바일 게임 ＂모두의 마블＂을 하는 것뿐이었습니다. 사실상 인터넷을 통해서 할 방법도 없었던거죠.

<p style="text-align: center;"><img src="/images/modumarble.png" alt="모두의 마블 전설 짤" style="width: 50%;"></p>
<p style="text-align: center;"><em>(부루마블을 개발하면서 알았는데, 모두의 마블은 아직도 서비스하고 있다고 합니다...)</em></p>

이러한 상황은 제게 탐탁지 않게 다가왔습니다. 주기적으로 돌아오는 부루마블에 대한 욕구(?)를 해소할 방법이 필요했거든요. 

**<u>그래서 이번 5월 연휴에, Claude와 함께 직접 부루마블을 만들어보기로 했습니다.</u>**

# 본론

먼저, 개발한 부루마블은 다음 깃허브 레포지토리에 오픈 소스로 올려두었으니, 누구나 내려받아서 즐겨주시면 감사하겠습니다 : [https://github.com/jj1kim/BlueMarble](https://github.com/jj1kim/BlueMarble)

개발을 시작하기에 앞서서, 개발 과정과 서비스에 대해 수립한 저만의 규칙은 다음과 같았습니다. 

1. 클로드 코드를 적극 사용하여, 본업인 연구와 동시에 진행하면서도 연구를 방해하지 않을 것. 
2. 게임을 하고자 하는 누구나 기술적인 제약 사항 없이 게임을 즐길 수 있을 것.
3. 서비스의 지속가능성이 특정 인물의 노력에 기대는 구조를 지양할 것.

사실 1번 규칙은, 굳이 규칙으로 만들지 않아도 자연스럽게 지켜지는 것이었습니다. 별로 제 손으로 코드를 짜고 싶은 생각은 없었거든요. 모처럼의 휴일을 맞아서 학교 수업 없이 연구에 더 집중할 수 있게 되었는데, 그 시간을 코드 해석과 작성에 낭비하고 싶지는 않았습니다. 따라서 클로드 코드를 아주 잘 사용하면서 최소한의 개입으로 결과물을 만들어내는 것을 목표로 했는데, 그 ＂잘 사용하는 방식＂에 대해서는 다른 포스트에서 다루도록 하겠습니다. 아무튼, 결과적으로 보면, 제가 직접 작성한 코드는 거의 없다고 할 수 있습니다. 

2번 규칙은 모바일, linux pc, mac pc, window pc 등 운영체제뿐만 아니라, 기기의 성능이 좀 떨어지더라도 누구나 게임을 즐길 수 있게 하려고 수립했습니다. 최근에 유행하는 모 SNS 앱이 게임을 해달라고 유저만 사용 가능했던지라 적잖이 아쉬움을 느꼈고, 이를 반면교사 삼았습니다.

## Q. 누구나 게임을 즐길 수 있게 하려면 어떻게 해야 할까요?

먼저, 게임의 실행 환경이 디바이스의 특정 기술 스택에 의존하지 않도록 구성되어야 합니다. 예를 들어서 리눅스에서만 쓸 수 있는 패키지를 쓰거나, 로컬 환경 자체에서 프로그램을 실행해야만 한다면 다른 환경의 사용자들은 게임을 즐기기 어려울 것입니다. 

처음에는 데스크톱 앱으로 게임을 개발한 뒤에 실행환경을 한 번에 구축할 수 있는 컨테이너 configuration까지 함께 제공해주는 방향으로 생각했었는데요, 이렇게 하면 데스크톱 유저들은 모두 즐길 수 있을지 몰라도 모바일 유저들은 즐길 수 없게 됩니다.

이런 고민을 거치다 보니, 결국 답은 하나라는 사실을 깨달았습니다. 모바일과 pc, 운영체제 여부를 막론하고 모두가 같이 사용하는 표준 환경은 단 하나, **브라우저**밖에 없다는 사실을요. 만약 이 게임이 완전히 브라우저에서 구동되게 한다면, 누구나 자신의 환경에 chrome과 같은 브라우저만 가지고도 게임을 즐길 수 있을 것입니다. 범용성에 대한 기술적인 고민을 chromium 개발진들에게 떠넘기는 것과 같은 것이죠.

따라서 아주 자연스럽게, 게임의 모든 부분을 Typescript 기반 React로 개발한 후에, 하나의 HTML 파일에 모든 자산을 빌드해서, 단일 HTML 파일만 가지고도 브라우저에서 누구나 게임을 할 수 있게 하는 방식을 생각할 수 있었습니다. 마침 Vite라는 굉장히 좋은 빌드 도구가 있고, 여기에 vite-plugin-singlefile이라는 도구를 더 붙여서, JS 코드 번들이나 CSS 및 모든 이미지와 폰트까지 단일 HTML에 빌드할 수 있습니다. 

이렇게 개발을 하고 나니 HTML 파일 하나가 무려 8MB 크기까지 불어나긴 했는데, 사실 게임을 구동하는 처지에서 전혀 무리는 아니었습니다. 게다가 환경에 구애받지 않고 브라우저 API를 사용할 수 있어서, 추후에 설명할 기능도 매우 편하게 구현할 수 있었고요. 온라인 통신 기능을 사용하지 않는 한, 게임 자체를 플레이하는데 있어서는 HTML 파일 이외의 그 어떤 것(인터넷까지)도 필요가 없었습니다. 

마지막으로 빼놓을 수 없는 것은 모바일 유저 등 다양한 화면 크기를 가진 유저들에 대한 반응형 구현이었는데요, React 프로젝트에 반응형 디자인을 구현하는 일은 기존에 웹 프론트엔드 개발을 했었던 제게는 큰 어려운 일이 아니었습니다. 이렇게 말하면 제가 다 한 것 같지만, 1번 규칙에 따라 저는 검수 위주로 하고 반응형 구현도 클로드의 몫이었습니다. 이것도 따지고 보면 브라우저 기반 게임 설계에 따른 이득이라고 할 수 있겠네요. 

![BlueMarble 릴리즈 페이지 ? 단일 HTML 파일](/images/bluemarble-release-capture.png)
<p style="text-align: center;"><em>(단일 HTML 파일이 유일한 구성 요소인 모습)</em></p>

이렇게 2번 규칙을 만족할 수 있었는데, 그다음은 3번 규칙이었습니다. ＂서비스의 지속가능성이 특정 인물의 노력에 기대는 구조＂라는건, 이때까지 개발되었다가 운영 중단된 수많은 온라인 게임들을 나타내는 표현입니다. 저는 이 게임이 제가 신경을 전혀 쓰지 못하더라도 많은 사람이 계속 즐길 수 있기를 바랐습니다. 제가 신경을 못 쓰면 서비스가 제대로 운영이 되지 못하거나, 망가지는 상황이 없어야 누구나 즐길 수 있는 게임이 되지 않겠습니까?

그런데 하나 고려해야 할 점이, 저는 이 게임을 서로 멀리 떨어져 있는 사람들끼리도 즐길 수 있기를 원했습니다. 사실 이게 안되면 게임에 참여하는 사람들 모두가 하나의 화면을 보면서 게임에 참여해야 하는 것인데, 이는 게임의 이용성을 크게 해친다고 생각했습니다. 게임에 참여한 사람들이 서로 다른 디바이스로 접속해서, 서로 통신하면서 게임을 진행하는 것이 올바른 구조라고 느꼈습니다.

대개의 온라인 게임들은 유저끼리 서로 통신하면서 게임을 즐길 수 있게 하려고, 자사의 게임 서버를 사용합니다. 자사의 게임 서버가 각 유저의 디바이스와 실시간 통신을 진행하면서 데이터를 저장하고, 서로의 상태를 맞추는 일 등을 해주는 것이죠. 쉽게 말하자면 중개를 해주는 제3자가 있어야 온라인 게임이 정상적으로 동작한다는 것입니다. 

여기서 딜레마가 발생합니다. 이 게임 서버를 유지하는 데에는 당연히 서버 대여 및 사용에 대한 비용도 나가고, 각종 이슈에 대해 끊임없이 관리를 해주어야 합니다. 서버비가 부족해서 운영을 종료한 서비스가 매우 많기도 하고, 서버를 관리하는 데 필요한 노력을 들이고 싶지도 않았습니다. 결국, ＂중앙화된 서버 없이 어떻게 통신과 게임 플레이를 구현할 것인가＂에 대한 문제로 귀결됩니다. 

## Q. 중앙화된 서버 없이 어떻게 통신과 게임 플레이를 구현할까요?

이 문제는 구체적으로 두 가지 문제로 나뉩니다. 첫 번째는 ＂중앙화된 서버 없이 어떻게 서로 통신하고 연결을 관리할 것인가＂에 대한 문제이고, 두 번째는 ＂통신이 가능한 상태에서 어떻게 서로의 상태를 동기화하면서도 정보를 한결같이 유지할 것인가＂에 대한 문제입니다. 상당히 기술적인 문제이고, 일반적인 컴퓨터 시스템과 네트워크 분야에서 자주 나오는 고민이기도 합니다.

### 첫 번째 문제 : 서버 없이 어떻게 서로 찾고 연결할까요?

사실 이 문제는 인터넷의 기본 구조와도 맞닿아 있습니다. 인터넷상에서 두 컴퓨터가 통신하려면 IP 주소로 서로 식별해야 하는데, 일반 사용자의 IP 는 통신사가 수시로 바꿔주고, 또 대개 NAT 뒤에 숨어 있어 외부에서 직접 찔러볼 수가 없습니다. 그래서 보통은 양쪽이 모두 접속할 수 있는 중간 지점에 의존합니다. 그게 바로 게임 서버이자, 카톡 서버이자, 디스코드 서버죠.

다만 우리는 그 중간 지점을 두지 않기로 했으니 다른 방법이 필요했습니다. 마침 이 요구를 정확히 충족하기 위해 만들어진 기술이 있었으니, 그것이 바로 **WebRTC** 입니다. WebRTC 는 브라우저끼리 직접 연결할 수 있게 해주는 표준 기술인데요, 영상 통화나 화면 공유처럼 데이터가 많이 오가는 통신에 자주 쓰입니다. 모든 트래픽이 중앙 서버를 거치지 않고 브라우저끼리 직접 가니까요.

그런데 문제가 그렇게 단순하게 풀리지는 않았습니다. WebRTC 가 두 브라우저를 직접 연결해주긴 하지만, 처음 연결을 시작할 때는 서로의 정보를 한 번 교환해야 합니다. 이때 교환하는 정보는 **SDP (Session Description Protocol)** 라는 형식의 텍스트 덩어리이며, IP 주소 & 포트 & 암호화 키 같은 메타데이터가 들어 있습니다. 이걸 양쪽이 주고받아야 비로소 직접 연결이 시작될 수 있는 거죠.

그러면 다시 막힙니다. **SDP 를 교환할 그 채널 자체가 또 어디선가 와야** 한다는 거예요. 보통은 **시그널링 서버** 라고 부르는 작은 중계 서버를 둬서, 양쪽이 거기에 접속해 SDP 를 주고받습니다. SDP 교환만 끝나면 그다음부턴 직접 연결로 갈아타기 때문에 게임 진행 중에는 시그널링 서버가 일을 안 하는데, 그래도 어쨌든 처음 한 번은 중계가 필요하다는 거고, 결국 서버를 두는 거랑 비슷한 비용 문제가 다시 생기는 셈이죠.

이쯤 되니 문제가 좀 까다로워 보였습니다. 그런데 뜻밖에 좋은 트릭이 있었어요. **BitTorrent 라는 파일 공유 프로토콜이 이미 전 세계에 공용 ＂트래커＂ 들을 무료로 운영하고 있다** 는 점이었습니다. 트래커는 본래 ＂이 파일을 어떤 피어들이 갖고 있느냐＂ 를 물어보는 곳인데, 그 메커니즘은 사실 ＂어떤 식별자(룸 코드) 를 가진 피어들이 누구냐＂ 라는 일반적인 매칭 서비스로도 쓸 수 있습니다. 누군가가 이미 깔아둔 공용 인프라를 시그널링 채널로 빌려 쓰는 셈이죠.

![BitTorrent 트래커를 통한 P2P 시그널링 흐름](/images/p2p-signaling.png)
<p style="text-align: center;"><em>(처음 두 단계만 트래커를 잠깐 거치고, 이후 게임 트래픽은 모두 두 브라우저 간 직접 연결로 흐릅니다.)</em></p>

이 발상을 깔끔하게 추상화해놓은 라이브러리가 [**Trystero**](https://github.com/dmotz/trystero) 였습니다. 12자리 룸 코드만 친구에게 알려주면, Trystero 가 BitTorrent 트래커를 통해 같은 코드를 가진 피어들을 자동으로 매칭하고 SDP 교환까지 알아서 처리해줍니다. 사용자 입장에선 그냥 룸 코드를 입력하면 끝이고, 개발자 입장에선 시그널링을 위한 별도 서버를 운영할 필요가 없어집니다.

다만 이 방식도 만능은 아니라서, 회사망이나 검열이 강한 환경에서는 BitTorrent 트래커 자체의 접근이 막힐 수 있습니다. 이런 경우를 위해 **수동 SDP 모드** 라는 폴백을 따로 마련해뒀어요. 양쪽 사용자가 WebRTC 가 만들어준 SDP 텍스트 덩어리를 메신저에 직접 복사·붙여넣기 해서 교환하는 방식인데요, 좀 번거롭지만 어떤 환경에서도 동작한다는 보장이 있어서 자동 모드의 안전망 역할을 합니다.

이렇게 두 브라우저가 서로 만나는 길은 어찌어찌 만들어졌습니다. 그런데 막상 게임을 굴려보니, 한 가지 더 까다롭고 흥미로운 문제가 따라오더라고요. **새로고침을 누르거나 모바일이 잠깐 끊겼다 돌아온 사용자가 있을 때, ＂이 사람이 그 사람＂ 이라는 걸 어떻게 알아낼 것이냐는 문제** 였습니다.

상황을 한번 그려봅시다. 게임이 한참 진행 중인데 누군가 무심코 새로고침을 눌렀습니다. WebRTC 연결이 끊기고, 다시 연결될 때 그 사람의 브라우저는 **새로운 임의 ID** 로 들어옵니다. 이건 WebRTC 의 기본 동작인데, 매 세션마다 ID 가 바뀌도록 설계되어 있습니다. 호스트 입장에서는 처음 보는 사람이 룸에 들어온 거나 마찬가지입니다. 하지만 게임의 자연스러운 진행을 위해서는 이 사람을 원래 슬롯으로 다시 앉혀야 합니다. 새로 들어온 게 아니라 잠깐 끊겼다 돌아온 사람이라는 걸 시스템이 알아야 하는 거죠. 서버가 있다면 로그인 세션 토큰으로 풀어낼 문제이지만, 우리는 그 서버가 없습니다. 그래서 다음과 같은 방식으로 풀었습니다.

```ts
// 사용자가 처음 룸에 들어올 때 토큰을 만들어 localStorage 에 영구 저장.
// 이후 어떤 peerId 로 들어오든 이 토큰만 같으면 ＂같은 사람＂.
const myToken = localStorage.getItem(＇bm_token＇) ?? generateToken()
localStorage.setItem(＇bm_token＇, myToken)

// 룸 입장 메시지에 토큰을 함께 보냄.
transport.send(host, { type: ＇HELLO＇, token: myToken, name: ＇민수＇ })
```

호스트 쪽에는 `토큰 → 슬롯번호` 매핑이 메모리에 살아 있습니다. 누군가 새 ID 로 들어왔을 때 같은 토큰을 들고 오면, 호스트가 ＂아, 이 사람 원래 2번이었네＂ 하고 같은 슬롯에 다시 앉힙니다. 만약 그 슬롯에 다른 ID 가 잘못 점유 중이면 강제로 빼냅니다. 슬롯 충돌은 강제 release시키고 같은 사람 식별은 토큰을 사용하는, 이 두 규칙의 조합으로 깔끔히 해결됩니다.

여기에 작은 디테일이 하나 있습니다. 어떤 사용자가 룸을 떠났을 때 슬롯은 비우지만 **토큰 매핑은 의도적으로 보존** 합니다. 그래야 잠깐 끊겼다 돌아오는 사람이 같은 슬롯으로 자동 복귀할 수 있거든요. 흔한 단방향 lifecycle (생성 → 사용 → 폐기) 와는 결이 다른 비대칭 패턴인데, 이런 작은 결정 하나가 사용자 경험에는 꽤 큰 영향을 준다고 생각했습니다.

본질을 한 줄로 정리해보면 이렇습니다. **중앙 인증 서버 없이도, 클라이언트가 영속 토큰을 들고 다니면 서버에서처럼 identity 를 유지할 수 있다.** 모든 신뢰는 호스트 한 명의 메모리에 의존하지만 (호스트가 죽으면 매핑도 같이 사라집니다), 어차피 한 번의 게임 시간 동안만 유지되면 충분하니 그 정도면 충분합니다.

### 두번째 문제 : 모두의 상태를 어떻게 일관되게 유지할까요?

이 문제는 통신 채널 자체가 아니라, 채널이 열린 다음 모두의 게임 상태를 어떻게 일치시킬 것인가에 관한 것입니다. 게임 상태는 모두에게 똑같이 보여야 합니다. 예를 들어 A 의 화면에서는 ＂B가 호텔을 지었다＂ 라고 나오는데 B 의 화면에서는 ＂안 지었다＂ 라고 나오면 게임이 망가져버리니까요. P2P 환경에선 모두가 서로에게 메시지를 보낼 수 있고, 모두가 자기 컴퓨터에서 게임 로직을 돌릴 수도 있습니다. 그러면 자연스레 **＂누구의 결정을 진실로 인정할 것인가?＂**에 대한 질문이 생깁니다. 

분산 환경에서 흔히 거론되는 동기화 방식은 크게 세 가지입니다.

- **Lockstep simulation**: 모두가 같은 입력을 받아 각자 같은 계산을 합니다. 입력 순서만 일치하면 결과도 자동으로 같다는 발상이에요. RTS 게임 (스타크래프트 등) 이 이런 식으로 돌아갑니다. 게임 로직이 완전히 결정론적이어야 하고 (RNG, 부동소수점 연산까지 비트 단위로 동일해야 함), 한 명이라도 어긋나면 desync가 나버립니다.
- **Authoritative server**: 중앙 서버가 모든 결정을 내리고, 클라이언트는 입력만 보내고 결과만 수신합니다. 가장 견고하지만 서버가 필요해서, 제 상황에는 맞지 않습니다.
- **Authority rotation**: 한 시점에 한 명만 결정을 내릴 권한을 갖고, 나머지는 그 결정을 받아서 그대로 채택합니다. 권한자는 게임 흐름에 따라 옮겨갑니다.

부루마블처럼 턴제 게임이라면 이 중 세 번째가 자연스럽게 들어맞습니다. 이미 ＂한 사람만 자기 차례에 행동한다＂는 게임 규칙 자체가, ＂권한자가 매 순간 한 명뿐＂ 이라는 분산 시스템 조건을 거저 만족시켜주거든요. 그래서 저는 **Authority rotation 방식** 으로 가기로 결정했습니다.

![권한자 broadcast → 검증 → 채택 흐름](/images/authority-broadcast.png)
<p style="text-align: center;"><em>(권한자 한 명이 reducer 를 돌리고 결과 state 를 broadcast, 나머지는 검증만 통과시키고 그대로 채택합니다.)</em></p>

구체적으로 동작하는 방식은 다음과 같습니다.

1. 현재 턴 플레이어가 자기 브라우저에서 액션을 발행합니다 (예: ＂주사위 굴리기＂).
2. 그 사람의 reducer (게임 로직 함수) 가 실행되어 새 game state 가 만들어집니다.
3. **새 state + 시퀀스 번호 + 본인 슬롯 번호** 를 한 패킷으로 묶어 모든 다른 피어에게 broadcast 합니다.
4. 받는 쪽은 두 가지를 검증합니다.
   - **시퀀스 번호 검증**: 이 메시지가 내가 마지막으로 본 메시지보다 새것인가 (낡거나 중복된 메시지 거부)
   - **슬롯 검증**: 보낸 사람이 진짜 현재 권한자가 맞는가 (악성, 버그성 송신 거부)
5. 두 검증을 모두 통과하면, 자기 state 를 받은 state 로 그대로 교체합니다.

여기서 주목할 점이 있어요. **수신자는 reducer 를 다시 돌리지 않는다** 는 거예요. 권한자가 이미 결과를 만들었으니, 그걸 그대로 채택만 합니다. 락스텝과 결정적으로 다른 부분이 바로 이 지점인데요, 락스텝은 ＂모두가 동일한 시뮬레이션을 한다＂는 까다로운 조건이 필요하지만, 이 모델에서는 권한자 한 명만 결과를 만들면 되므로 결정론성에 대한 부담이 훨씬 적습니다.

이 모델이 매끄럽게 돌아가기 위해 한 가지 큰 가정이 깔려 있습니다. **권한자가 자기 턴 동안 멀쩡히 살아 있다** 는 가정이요. 그런데 이게 깨지는 순간 전체 게임이 멈춥니다.

누군가의 턴 도중 그 사람의 인터넷이 끊기면 어떻게 될까요? 그 사람만 dispatch 권한이 있는 상태에서 그 권한자가 사라졌으니, 모두가 무한정 기다리게 됩니다. 게임은 진행이 안 되고, 다른 플레이어들도 참고 기다리기 외엔 할 수 있는 게 없죠.

처음에는 이 문제를 단순한 방식으로 풀려고 했습니다. ＂끊긴 사람의 결정 단계는 호스트가 적당한 default 액션으로 대신 마무리하자＂ 라는 발상이었어요. 예를 들어 통행료를 내야 하는 결정 단계에서 끊겼으면 호스트가 PAY_RENT 액션을 대신 발행하고, 매입 결정에서 끊겼으면 DECLINE 으로 처리하는 식이죠.

그런데 이걸 작성하다가 문제를 발견했습니다. 통행료 단계에서 끊긴 사람을 강제로 파산 처리하면 그 사람의 자산이 채권자에게 넘어가는 게 부루마블의 기본 룰인데, 채권자는 호스트일 수도 있고 아닐 수도 있다는 거예요. 만약 호스트가 채권자라면 **호스트가 끊김 상황을 자기에게 유리한 방향으로 활용할 수 있게** 됩니다. 다른 플레이어들이 잠깐 자리를 비운 사이 호스트가 일부러 강제 결정을 발동시켜서 자산을 빼올 수도 있다는 얘기죠.

이 발견 이후에 동작을 다음과 같이 다시 설계하여 해결할 수 있었습니다.

1. 끊긴 사람의 차례가 돌아왔을 때만, 호스트에게 모달이 뜹니다. (＂기다리시겠습니까? 강제 파산시키시겠습니까?＂)
2. 호스트가 강제 파산을 선택하면, 그 사람의 **자산은 무조건 은행으로 회수** 됩니다. 통행료 채권자가 따로 있더라도 그쪽으로 자산이 가지 않습니다.
3. 강제 파산과 다음 턴으로 넘어가는 처리까지 reducer 안에서 한 번에 끝내서, 호스트가 사이에 다른 액션을 끼워넣을 여지를 없앴습니다.

# 결론

개발하면서 우여곡절은 많았지만 결과물은 아주 잘 나왔고, 기본적인 게임 플레이부터 상호 간 통신까지 잘 동작하는 상태입니다. 물론 제가 직접 테스트한 것이라 많은 시나리오를 테스트할 수 없었으니, 이 글을 끝까지 읽으신 여러분께서도 플레이해보시고 문제점들을 찾아주시면 정말 감사드리겠습니다.

위에서 첨부했듯이 이 프로젝트는 오픈소스로 관리할 예정이고, 누구나 이 링크([https://github.com/jj1kim/BlueMarble](https://github.com/jj1kim/BlueMarble))에 접속해서 게임을 다운로드 받거나 이슈를 제보하고 코드에 기여하실 수 있습니다. 관련해서 더 자세한 설명은 링크 속 설명문을 읽어보시면 되겠습니다.

연구를 하면서 병행하는 개발로 대충 10시간 정도 소모했으니, 제 10시간의 노력과 클로드 토큰 비용만으로 모든 부루마블 사랑꾼들의 니즈를 충족할 수 있기를 바랍니다. 아주 재미있는 경험이었고, 종종 필요한 것이 생각나거나 해볼만한 것들이 떠오르면 이와 같은 형식으로 포스팅을 올려보겠습니다.

2026년 5월 3일, 김지원

---

<div style="display: inline-block; padding: 0.3em 0.7em; background-color: #f0f0f0; border-radius: 4px; font-weight: bold; margin: 1em 0; font-size: 0.9em; color: #000 !important;">English</div>

Hello. It has been a while since I posted on the blog. I am still working hard on my research these days, and whenever I have some spare time, I live a life of pondering with Claude about "what fun thing should we try?".

# Introduction

Ever since I was young, I have loved the board game "BlueMarble." I dare to assume that no Korean would be unfamiliar with this board game. If you are not Korean... please understand it as a board game very similar in form to Monopoly and extremely famous in Korea. Ever since my parents bought me BlueMarble around the age of ten, I bothered my family quite a lot to play it together. However, since BlueMarble takes a fair amount of time for one round, my family rather avoided it.

As I grew older, I too could no longer spend my time leisurely, and BlueMarble was temporarily forgotten from my memory. Taking advantage of this, my parents got rid of the BlueMarble that was at home. Because of this, even when I occasionally remembered BlueMarble, I could not play it since there was no game board at home. Even when I tried to find a way to play it online, the only and most similar option was to play the utterly failed mobile game "Modu Marble." There was practically no way to play it online either.

<p style="text-align: center;"><img src="/images/modumarble.png" alt="A legendary meme of Modu Marble" style="width: 50%;"></p>
<p style="text-align: center;"><em>(I learned while developing BlueMarble that Modu Marble is still being serviced...)</em></p>

This situation did not sit well with me. I needed a way to satisfy the periodic urge(?) for BlueMarble that kept returning.

**<u>So during this May holiday, I decided to make BlueMarble myself with Claude.</u>**

# Main

First, I have uploaded the BlueMarble I developed to the following GitHub repository as open source, so I would appreciate it if anyone could download and enjoy it: [https://github.com/jj1kim/BlueMarble](https://github.com/jj1kim/BlueMarble)

Before starting development, the rules I established for myself regarding the development process and service were as follows.

1. Actively use Claude Code so that I can proceed simultaneously with my main work, research, without disrupting it.
2. Anyone who wants to play the game should be able to enjoy it without any technical constraints.
3. Avoid a structure where the sustainability of the service depends on the efforts of a specific person.

Actually, rule #1 was something that would naturally be followed even without making it a rule. I had little desire to write code with my own hands. With the rare holiday, I could focus more on research without school classes, and I did not want to waste that time interpreting and writing code. Therefore, I aimed to use Claude Code very well and produce results with minimal intervention, and I will cover that "way of using it well" in another post. Anyway, as a result, you could say I wrote almost no code myself.

Rule #2 was established so that anyone could enjoy the game regardless of operating system — whether mobile, Linux PC, Mac PC, or Windows PC — and even with somewhat lower-spec devices. I felt quite a bit of regret because a recently trending SNS app's game was only usable by certain users, and I took this as a lesson learned from a negative example.

## Q. How can we ensure that anyone can enjoy the game?

First, the game's execution environment must be configured so that it does not depend on the device's specific tech stack. For example, if it uses packages that can only be used on Linux, or if the program must be run in the local environment itself, users in other environments would have difficulty enjoying the game.

At first, I thought about developing the game as a desktop app and then providing container configurations that could set up the execution environment all at once. However, while this would let all desktop users enjoy it, mobile users would not be able to.

After going through these considerations, I realized that the answer was ultimately one. The standard environment that everyone uses regardless of mobile or PC, regardless of operating system, is the one and only **browser**. If this game runs entirely in a browser, anyone could enjoy the game in their own environment with just a browser like Chrome. It is like delegating the technical concerns about universality to the Chromium developers.

Therefore, very naturally, I could think of a way to develop all parts of the game with TypeScript-based React, then build all assets into a single HTML file, so that anyone could play the game in a browser with just a single HTML file. Fortunately, there is a great build tool called Vite, and by adding a tool called vite-plugin-singlefile, you can build JS code bundles, CSS, and even all images and fonts into a single HTML.

After developing it this way, the single HTML file ended up swelling to 8MB in size, but actually, from the perspective of running the game, this was not a problem at all. Moreover, since I could use browser APIs without being constrained by the environment, I was able to implement the features I will explain later very conveniently. As long as one does not use online communication features, nothing other than the HTML file (not even the internet) was needed to play the game itself.

Lastly, what cannot be missed is the responsive implementation for users with various screen sizes, including mobile users. Implementing responsive design in a React project was not a major difficulty for me, since I had previously done web frontend development. While saying it like this makes it sound like I did everything, according to rule #1, I mainly did review work, and the responsive implementation was also Claude's job. This too could be considered a benefit of the browser-based game design.

![BlueMarble release page - a single HTML file](/images/bluemarble-release-capture.png)
<p style="text-align: center;"><em>(Showing that a single HTML file is the only component)</em></p>

This is how I was able to satisfy rule #2, and next came rule #3. The phrase "a structure where service sustainability depends on the efforts of a specific person" describes the countless online games that were developed but had their service discontinued. I wanted this game to be enjoyable for many people even if I could not pay attention to it at all. Wouldn't it become a game that anyone can enjoy only if there is no situation where the service fails to operate properly or breaks down because I cannot pay attention?

But one thing to consider is that I wanted this game to be enjoyable even between people who are far apart. Actually, if this is not possible, all participating people would have to look at one screen to participate in the game, which I thought would greatly harm the game's usability. I felt that the right structure was for participants to connect from different devices and communicate with each other while playing.

Most online games use their own game servers to enable users to communicate with each other and enjoy the game. The company's game server engages in real-time communication with each user's device, storing data and matching each other's states. Simply put, online games can only operate normally with a third-party intermediary.

Here lies a dilemma. Maintaining this game server naturally incurs costs for server rental and use, and constant management is required for various issues. Many services have ended due to insufficient server costs, and I did not want to put in the effort needed to manage a server. Ultimately, this comes down to the question, "How can we implement communication and gameplay without a centralized server?"

## Q. How do we implement communication and gameplay without a centralized server?

This problem specifically divides into two problems. The first is "how do we communicate with each other and manage connections without a centralized server?", and the second is "how do we keep information consistent while synchronizing each other's states once communication is possible?". These are quite technical problems and are also common concerns in the general field of computer systems and networking.

### First problem: How do we find and connect to each other without a server?

Actually, this problem is connected to the basic structure of the Internet. For two computers to communicate over the Internet, they must identify each other by IP address, but ordinary users' IPs are frequently changed by carriers and are usually hidden behind NAT, so they cannot be probed directly from outside. So usually, both sides rely on a middle point that they can both connect to. That is the game server, the KakaoTalk server, the Discord server.

However, since we decided not to have that middle point, we needed another method. Fortunately, there is a technology made precisely to meet this need: **WebRTC**. WebRTC is a standard technology that allows browsers to connect directly to each other, often used for communication with heavy data exchange like video calls or screen sharing. This is because all traffic goes directly between browsers without going through a central server.

But the problem does not get solved that simply. Although WebRTC connects two browsers directly, when initially starting the connection, they need to exchange information once. The information exchanged at this time is a chunk of text in the form of **SDP (Session Description Protocol)**, containing metadata such as IP address, port, and encryption keys. This must be exchanged between both sides for the direct connection to begin.

Then we get stuck again. **The channel for exchanging SDP itself has to come from somewhere**. Usually, a small relay server called a **signaling server** is set up so that both sides connect there and exchange SDP. Once the SDP exchange is complete, they switch to direct connection from then on, so the signaling server does not do work during gameplay, but at least one initial relay is needed, and ultimately a similar cost problem to having a server arises again.

At this point, the problem looked a bit tricky. But unexpectedly, there was a good trick. **The fact is that the file-sharing protocol BitTorrent already operates public "trackers" for free worldwide**. A tracker is originally a place where you ask "which peers have this file?", but that mechanism can actually be used as a general matching service of "which peers have a certain identifier (room code)?". It is like borrowing public infrastructure that someone has already set up as a signaling channel.

![P2P signaling flow through a BitTorrent tracker](/images/p2p-signaling.png)
<p style="text-align: center;"><em>(Only the first two steps briefly go through the tracker; afterwards all game traffic flows through direct connection between the two browsers.)</em></p>

The library that cleanly abstracts this idea is [**Trystero**](https://github.com/dmotz/trystero). If you just give your friend a 12-digit room code, Trystero automatically matches peers with the same code through BitTorrent trackers and even handles the SDP exchange itself. From the user's perspective, you just enter the room code and you are done; from the developer's perspective, you do not need to operate a separate server for signaling.

However, this method is not omnipotent either, so access to the BitTorrent trackers themselves can be blocked in corporate networks or environments with strong censorship. For these cases, I prepared a separate fallback called **manual SDP mode**. It is a method where both users directly copy and paste the SDP text chunk that WebRTC creates into a messenger and exchange it. It is somewhat cumbersome, but it has the guarantee of working in any environment, so it serves as a safety net for the automatic mode.

This way, the path for two browsers to meet each other was somehow created. But when I actually ran the game, one more tricky and interesting problem followed. **When a user has refreshed or had their mobile briefly disconnect and return, how do we figure out that "this person is that person"?**

Let us picture the situation. The game is in full progress when someone carelessly hits refresh. The WebRTC connection breaks, and when reconnecting, that person's browser comes in with a **new random ID**. This is WebRTC's default behavior, designed so that the ID changes every session.

From the host's perspective, it is the same as someone they have never seen entering the room. But for the natural progression of the game, this person needs to be reseated in their original slot. The system needs to know that this is not a new entrant but someone who briefly disconnected and returned.

If we had a server, this would be a problem solvable with login session tokens, but we do not have that server. So I solved it the following way.

```ts
// When the user first enters the room, create a token and permanently store it in localStorage.
// Afterwards, regardless of which peerId they enter with, if this token is the same, they are "the same person".
const myToken = localStorage.getItem(＇bm_token＇) ?? generateToken()
localStorage.setItem(＇bm_token＇, myToken)

// Send the token together with the room entry message.
transport.send(host, { type: ＇HELLO＇, token: myToken, name: ＇민수＇ })
```

On the host side, a `token → slot number` mapping is alive in memory. When someone enters with a new ID and brings the same token, the host says "Ah, this person was originally #2" and reseats them in the same slot. If another ID is wrongly occupying that slot, it forcibly removes them. The combination of these two rules — forcibly releasing slot conflicts and using tokens to identify the same person — neatly resolves it.

There is a small detail here. When a user leaves the room, the slot is emptied but **the token mapping is intentionally preserved**. This way, someone who briefly disconnects and returns can automatically come back to the same slot. It is an asymmetric pattern that differs from the common one-way lifecycle (creation → use → discard), and I think such small decisions have quite a big impact on user experience.

If I summarize the essence in one line, it is this. **Even without a central authentication server, if the client carries a persistent token, identity can be maintained as if on a server.** All trust depends on the memory of one host (if the host dies, the mapping disappears too), but since it only needs to last for one game session anyway, that is enough.

### Second problem: How do we keep everyone's state consistent?

This problem is not about the communication channel itself, but about how to align everyone's game state after the channel is open. The game state must look the same to everyone. For example, if A's screen shows "B built a hotel" but B's screen shows "did not build", the game breaks down. In a P2P environment, everyone can send messages to each other, and everyone can also run game logic on their own computer. So naturally, the question arises: **"Whose decision shall we accept as truth?"**

There are largely three synchronization methods commonly discussed in distributed environments.

- **Lockstep simulation**: Everyone receives the same input and each does the same calculation. The idea is that if the input order matches, the result is automatically the same. RTS games (StarCraft, etc.) work this way. The game logic must be completely deterministic (RNG, even floating-point operations must be bit-identical), and if even one person diverges, a desync occurs.
- **Authoritative server**: A central server makes all decisions, and clients only send inputs and receive results. The most robust, but a server is required, so it does not fit my situation.
- **Authority rotation**: At any point in time, only one person has the authority to make decisions, and the rest receive that decision and adopt it as is. The authority shifts along with the game flow.

For turn-based games like BlueMarble, the third option naturally fits. The game rule itself that "only one person acts on their turn" already satisfies the distributed system condition that "there is only one authority at any moment" for free. So I decided to go with the **Authority rotation method**.

![Authority broadcast → validation → adoption flow](/images/authority-broadcast.png)
<p style="text-align: center;"><em>(One authority runs the reducer and broadcasts the resulting state; the rest only validate and adopt it as is.)</em></p>

Specifically, the way it operates is as follows.

1. The current turn player issues an action in their browser (e.g., "rolling dice").
2. That person's reducer (game logic function) runs and a new game state is created.
3. The **new state + sequence number + their own slot number** are bundled into one packet and broadcast to all other peers.
4. The receiving side validates two things.
   - **Sequence number validation**: Is this message newer than the last one I saw? (rejects stale or duplicate messages)
   - **Slot validation**: Is the sender actually the current authority? (rejects malicious or buggy transmissions)
5. If both validations pass, replace one's own state with the received state as is.

There is a notable point here. **The receiver does not run the reducer again**. Since the authority has already created the result, they only adopt it as is. This is precisely where it differs decisively from lockstep — lockstep requires the demanding condition that "everyone runs the same simulation", but in this model, only one authority needs to create the result, so the burden of determinism is much lighter.

There is one big assumption underlying this model running smoothly. **The authority is alive and well during their turn**. But the moment this assumption is broken, the entire game stops.

What happens if someone's internet disconnects during their turn? Since only that person has dispatch authority and that authority has disappeared, everyone waits indefinitely. The game cannot progress, and other players have nothing to do but patiently wait.

At first, I tried to solve this problem in a simple way. The idea was "let the host complete the disconnected person's decision step with an appropriate default action." For example, if they disconnected at the rent payment decision step, the host would issue a PAY_RENT action on their behalf, and at the purchase decision, process it as DECLINE.

But while writing this, I discovered a problem. The basic rule of BlueMarble is that when a disconnected person is forcibly bankrupted at the rent stage, their assets go to the creditor — but the creditor could be the host or could not be. If the host is the creditor, **the host could exploit the disconnection situation to their own advantage**. This means the host could deliberately trigger a forced decision while other players are briefly away and steal assets.

After this discovery, I was able to redesign the behavior as follows to resolve it.

1. Only when the disconnected person's turn comes around, a modal appears for the host. ("Will you wait? Or force bankruptcy?")
2. If the host chooses force bankruptcy, that person's **assets are unconditionally returned to the bank**. Even if there is a separate rent creditor, the assets do not go that way.
3. The forced bankruptcy and the transition to the next turn are completed at once inside the reducer, eliminating any room for the host to insert another action in between.

# Conclusion

There were many ups and downs during development, but the result came out very well, and everything works properly from basic gameplay to mutual communication. Of course, since I tested it myself, I could not test many scenarios, so if those of you who have read this article all the way through could play it and find any problems, I would be very grateful.

As I attached above, this project will be managed as open source, and anyone can access this link ([https://github.com/jj1kim/BlueMarble](https://github.com/jj1kim/BlueMarble)) to download the game, report issues, or contribute to the code. For more detailed explanations, please read the descriptions at the link.

Since I spent roughly 10 hours on parallel development while doing research, I hope that with my 10 hours of effort and Claude token costs alone, the needs of all BlueMarble lovers can be met. It was a very enjoyable experience, and whenever something I need comes to mind or things worth trying come up, I will try to post in this format from time to time.

May 3, 2026, Jiwon Kim
