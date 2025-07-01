# AI 사진 분석 (Simple Ver.) - 클론코딩 가이드

안녕하세요! 코딩에 첫발을 내디딘 것을 환영합니다.
이 프로젝트는 웹 개발의 가장 기본이 되는 HTML, CSS, JavaScript를 이용해 간단한 'AI 사진 분석' 웹페이지를 만들어보는 클론코딩 프로젝트입니다.

**ver 2.0 업데이트**: 이제 진짜 AI 모델인 **TensorFlow.js**를 탑재하여, 여러분의 웹 브라우저에서 직접 이미지를 분석합니다!

## 🚀 프로젝트 실행 방법

복잡한 설치 과정은 전혀 필요 없어요!
1.  이 파일들이 있는 `AIphoto-simple` 폴더를 엽니다.
2.  `index.html` 파일을 더블클릭해서 웹 브라우저(Chrome, Edge 등)로 열어보세요.
3.  **주의**: 페이지를 처음 열면 AI 모델을 다운로드하므로 약간의 시간이 걸릴 수 있습니다. "AI 모델 준비 중..." 메시지가 "사진 선택하기"로 바뀌면 준비가 완료된 것입니다.

## 📝 클론코딩 학습 가이드

직접 코드를 처음부터 따라 작성해보는 것이 가장 좋은 학습 방법입니다. 아래 순서대로 도전해보세요!

### **1단계: HTML에 AI 라이브러리 추가하기 (`index.html`)**

`index.html` 파일의 `<head>` 태그 안에, AI 모델을 사용하기 위한 두 줄의 코드를 추가했습니다.
```html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@latest/dist/mobilenet.min.js"></script>
```
-   이 코드들은 인터넷을 통해 TensorFlow.js와 이미지 인식 모델(MobileNet)을 우리 페이지로 가져오는 역할을 합니다. 이렇게 CDN 방식을 사용하면 별도의 설치 없이 라이브러리를 쓸 수 있어 편리합니다.

### **2단계: CSS로 예쁘게 디자인하기 (`style.css`)**

CSS 파일은 변경되지 않았습니다. 여전히 페이지의 디자인을 담당합니다.

### **3단계: JavaScript로 진짜 AI 실행하기 (`script.js`)**

`script.js` 파일이 크게 업그레이드되었습니다.

1.  **AI 모델 로드**: 페이지가 열리면 가장 먼저 `mobilenet.load()` 함수가 실행됩니다. 이 함수는 이미지 분석에 필요한 AI 모델 파일을 다운로드하고 준비시킵니다. 모델이 준비되기 전까지 버튼은 비활성화됩니다.
2.  **비동기(async/await)**: `loadModel`, `analyzePhoto` 함수 앞에 `async` 키워드가 붙었습니다. AI 모델을 로드하거나 분석하는 작업은 시간이 걸리기 때문에, 프로그램이 멈추지 않고 계속 다른 작업을 할 수 있도록 '비동기' 방식으로 처리해야 합니다. `await`는 시간이 걸리는 작업이 끝날 때까지 기다려주는 역할을 합니다.
3.  **AI 분석 실행**: `model.classify(imagePreview)` 코드가 핵심입니다! 이 한 줄의 코드가 `imagePreview`에 보이는 이미지를 AI 모델(MobileNet)에게 보내 분석을 요청하고, 그 예측 결과를 돌려줍니다.
4.  **결과 표시**: AI는 사진에 있는 사물이 무엇인지, 그리고 그 예측이 얼마나 정확한지(확률)를 알려줍니다. `displayResults` 함수는 이 정보를 받아서 "이 사진은 95% 확률로 '고양이'(으)로 보입니다." 와 같이 사용자가 보기 좋은 문장으로 만들어 화면에 표시합니다.
5.  **재미 요소**: `getPersonalityFor` 함수는 AI가 인식한 사물 이름(예: 'cat', 'dog')에 따라 미리 준비된 다른 성격 분석 메시지를 보여주는 작은 재미 요소입니다.

## 🌟 다음 단계 (Next Step)

이 프로젝트에 익숙해졌다면, 아래 기능들을 스스로 추가해보며 실력을 키워보세요!

-   `getPersonalityFor` 함수에 `if/else if` 문을 더 추가해서, '자동차', '꽃', '음식' 등 새로운 사물을 인식했을 때 다른 메시지가 나오도록 만들어보기
-   AI가 분석한 결과 `predictions` 배열에는 가장 높은 확률 외에도 여러 후보가 들어있습니다. `console.log(predictions)` 로 전체 결과를 확인하고, 상위 3개의 예측 결과를 모두 보여주도록 `displayResults` 함수를 수정해보기

---

이제 여러분의 웹페이지는 진짜 온디바이스 AI를 갖게 되었습니다. 즐겁게 코딩하세요! 