# 🔴 사이트 내려둔 상태 — 복구 안내

> **현재 https://jj1kim.site 는 빈 페이지만 서빙 중입니다.**
> 도메인·DNS·HTTPS는 전부 살아 있고, 콘텐츠만 내려둔 상태입니다.
> 다시 올리려면 아래 [복구 방법](#복구-방법) 한 줄이면 됩니다.

- 내린 날짜: **2026-09-07**
- 내린 이유: 사용자 요청 (도메인은 유지한 채 사이트만 비공개)

---

## 복구 방법

### 가장 간단 (권장)

```bash
git push origin site-backup-20260907:master --force
```

이게 전부입니다. 1~2분 뒤 https://jj1kim.site 가 원래대로 돌아옵니다.
`CNAME`이 함께 복원되므로 **GitHub/가비아에서 도메인 재설정할 필요 없습니다.**

### 대안 — 내림 커밋만 revert

```bash
git fetch origin
git checkout -B master origin/master
git revert --no-edit 90048b5
git push origin master
```

### 복구 확인

```bash
curl -s -o /dev/null -w "%{http_code}\n" https://jj1kim.site/          # 200
curl -s -o /dev/null -w "%{http_code}\n" https://jj1kim.site/blog/     # 200 이면 성공
gh api repos/jj1kim/jj1kim.github.io/pages --jq '.status, .cname'      # built / jj1kim.site
```

복구 후 Google Search Console에서 재색인 요청을 하세요.
(내려둔 플레이스홀더에 `noindex, nofollow`를 걸어놨기 때문입니다.)

---

## 무엇을 바꿨나

GitHub Pages는 **끄지 않았습니다.** `master` 브랜치의 내용만 최소 플레이스홀더로 교체했습니다.

| | |
|---|---|
| 내리기 전 라이브 커밋 | `c303c80` — Merge pull request #91 from jj1kim/making |
| 내림 커밋 | `90048b5` — take site offline, keep domain binding intact |
| 현재 `master`의 파일 | `CNAME`, `.nojekyll`, `index.html` — **이 3개가 전부** |

- `CNAME` (내용: `jj1kim.site`) — 유지. 이 파일이 커스텀 도메인을 붙들고 있습니다.
- `.nojekyll` — Jekyll 빌드 없이 파일을 그대로 서빙.
- `index.html` — 이름 한 줄만 있는 빈 페이지. `noindex, nofollow` 적용.

### 왜 Pages를 끄지 않고 이 방식을 썼나

Pages를 완전히 끄면 DNS는 계속 GitHub(185.199.x.x)을 가리키는데 그 도메인을 점유한
사이트가 없는 **dangling DNS** 상태가 됩니다. 이때 제3자가 아무 리포에서 Pages를 켜고
커스텀 도메인을 `jj1kim.site`로 설정하면 **그 사람 콘텐츠가 이 도메인으로 서빙**됩니다
(GitHub Pages domain takeover). `jj1kim.site`는 GitHub 계정에 도메인 인증이 안 된
상태(`protected_domain_state: null`)라 이 위험이 실제로 존재합니다.

플레이스홀더를 띄워두면 이 리포가 도메인을 계속 점유하므로 takeover가 원천 차단됩니다.

---

## 백업 위치 — 원본 사이트 전체

| 브랜치 | 커밋 | 비고 |
|---|---|---|
| `origin/site-backup-20260907` | `c303c80` | ★ **정본.** 내리기 직전 라이브 상태 그대로. CNAME 포함 |
| `origin/making` | `3297d60` | 작업 브랜치. 콘텐츠는 동일하지만 **CNAME 없음** ⚠️ |
| git 히스토리 | `90048b5^` | = `c303c80` |

---

## ⚠️ 절대 주의사항

**`CNAME` 파일(내용 `jj1kim.site`)을 지우지 마세요.** 이 파일이 커스텀 도메인을 붙들고 있습니다.

**`making` 브랜치에는 `CNAME`이 없습니다.** `making`을 그대로 `master`에 머지/푸시하면
CNAME이 삭제되면서 커스텀 도메인이 풀리고, 위에서 설명한 dangling DNS + takeover
위험 상태가 됩니다.

→ `making`에서 작업 후 배포할 때는 **`CNAME` 파일이 결과물에 포함되는지 반드시 확인**하세요.
   아예 `making`에도 CNAME 파일을 만들어 두는 것이 안전합니다:

```bash
git checkout making
echo "jj1kim.site" > CNAME
git add CNAME && git commit -m "add CNAME to keep custom domain on merge"
git push origin making
```

---

## 인프라 현황 (이번 작업으로 **변경되지 않음**)

| 항목 | 값 |
|---|---|
| 도메인 등록기관 | 가비아 (Gabia) |
| 네임서버 | `ns.gabia.co.kr`, `ns.gabia.net`, `ns1.gabia.co.kr` |
| A 레코드 | `185.199.108.153`, `.109.153`, `.110.153`, `.111.153` (GitHub Pages) |
| `www` 서브도메인 | **미설정** — `www.jj1kim.site` 접속 불가 |
| Pages source | `master` 브랜치 / 루트 (`build_type: legacy`) |
| HTTPS | 강제 적용. 인증서 `CN=jj1kim.site`, 만료 2026-12-03 (Pages 켜둔 상태라 자동 갱신) |
| 도메인 verify | **미인증** (`protected_domain_state: null`) |

### 나중에 Pages를 아예 끄고 싶어지면

그 전에 반드시 GitHub 도메인 인증을 먼저 하세요. 안 그러면 takeover 위험에 노출됩니다.

1. GitHub → Settings → Pages → **Verified domains** → `jj1kim.site` 추가
2. 안내되는 TXT 레코드(`_github-pages-challenge-jj1kim.jj1kim.site`)를 가비아 DNS에 등록
3. 인증 완료 확인 후 Pages 비활성화

### 그 외 권장 작업

- 가비아에서 `www` CNAME → `jj1kim.github.io.` 추가 (현재 `www.jj1kim.site` 안 열림)
