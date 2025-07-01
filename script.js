// 1. DOM 요소 가져오기
const photoInput = document.getElementById('photo-input');
const analyzeButton = document.getElementById('analyze-button');
const previewArea = document.getElementById('preview-area');

const uploadSection = document.getElementById('upload-section');
const progressSection = document.getElementById('progress-section');
const resultSection = document.getElementById('result-section');

const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const resultsDiv = document.getElementById('results');
const resultButton = document.getElementById('result-button');

let photoFiles = []; // 업로드된 사진 파일들을 저장할 배열

// 2. 이벤트 리스너 설정

// 사진 입력 변경시
photoInput.addEventListener('change', (event) => {
  // 기존 미리보기 초기화
  previewArea.innerHTML = '';
  photoFiles = Array.from(event.target.files); // 선택된 파일들을 배열로 저장

  // 미리보기 이미지 생성
  photoFiles.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement('img');
      img.src = e.target.result;
      previewArea.appendChild(img);
    };
    reader.readAsDataURL(file);
  });

  // 사진이 3장 이상이면 분석 버튼 활성화
  analyzeButton.disabled = photoFiles.length < 3;
});

// 분석 버튼 클릭시
analyzeButton.addEventListener('click', () => {
  // UI전환
  uploadSection.style.display = 'none';
  progressSection.style.display = 'block';

  // AI 모델 로드
  updateProgress(10, 'AI 모델 로드하는 중...');
  const model = await mobilenet.load();
  updateProgress(30, '사진 분석을 시작합니다...');

  // 각 사진 분석
  const analyses = [];
  for (let i = 0; i<photoFiles.length; i++) {
    const file = photoFiiles[i];
    const img = await createImageElement(file);

    const predictions = await model.classify(img);

    // 실제 프로젝트에서는 색상, 구도 분석이 추가
    // 여기서는 간단 예측
    analyses.push({predictions});

    const percent = 30 + (i + 1) * 20 / photoFiles.length * 50;
    updateProgress(percent, '${i+1}번째 사진 분석 완료...');
  }

  // 성향 도축 (간소화된 로직)
  updateProgress(90, '성향 도출 중...');
  const result = generatePersonality(analyses);

  // 결과 표시
  updateProgress(100, '분석완료!');
  displayResults(result);

});

// 다시하기 버튼 클릭시
restartButton.addEventListener('click', () => {
  //초기 상태로 되돌리기
  uploadSection.style.display = 'block';
  progressSection.style.display = 'none';
  resultSection.style.display = 'none';

  photoInput.value = ''; // 파일 입력 초기화
  previewArea.innerHTML = ''; // 미리보기 초기화
  photoFiles = []; // 파일 배열 초기화
  analyzeButton.disabled = true; // 분석 버튼 비활성화
  progressBar.style.width = '0%'; // 진행바 초기화

});

// 3. 헬퍼 함수

// 진행 상태 업데이트 함수
function updateProgress(percentage, text) {
  progressBar.value = percentage;
  progressText.textcContent = text;
}

// 파일로부터 이미지 엘리먼트 생성
function createImageElement(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
      img.onload = () => resolve(img);
      img.onerror = reject;
    };
    reader.readAsDataURL(file);
  })
}

