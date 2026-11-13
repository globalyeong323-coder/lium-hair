# 리움헤어 홈페이지 (LIUM HAIR)

## 파일 구성
- index.html : 메인 페이지
- cut.html / perm.html / care.html : 헤어 · 펌·염색 · 헤어케어 메뉴 페이지
- style.css : 디자인(색상·글꼴·모바일 화면)
- script.js : 예약 문의 폼 동작
- images/ : 사진 (같은 이름으로 바꿔 넣으면 사진이 교체됩니다)

## GitHub Pages로 올리기
1. GitHub에서 New repository → 이름 입력 → Public 선택 → Create
2. "uploading an existing file" 클릭 → 이 폴더 안의 파일과 images 폴더를 모두 끌어다 놓기 → Commit changes
3. Settings → Pages → Branch를 main / (root)로 선택 → Save
4. 1~2분 후 https://아이디.github.io/저장소이름/ 으로 접속

## 내 도메인 연결
Settings → Pages → Custom domain에 도메인 입력 → 도메인 업체(카페24 등) DNS에
GitHub 안내대로 A 레코드 / CNAME 레코드 입력 → Enforce HTTPS 체크

## 가격·문구 수정
각 html 파일을 GitHub에서 열고 연필(Edit) 아이콘을 눌러 글자를 고친 뒤 Commit changes.
가격은 cut.html / perm.html / care.html 의 "메뉴 안내" 부분에 있습니다.

## 예약 문의를 이메일로 받기
script.js 맨 위 FORM_ENDPOINT 설명 참고 (Formspree 무료).
설정 전에는 모바일에서 문자 앱으로, PC에서는 내용 복사 후 안내 문구가 나옵니다.
