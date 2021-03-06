import Image from "next/image";
import React, {useState, useRef} from "react";

import styles from "./BlockFourAskProblem.module.scss";

import plusSvg from "../../../public/image/block-four-ask-problem/plus-icon.svg";

const videoNull = `#`;

const askProblemsItems = {
  Mood: "mood",
  Target: "target",
  Behavior: "behavior",
  Other: "other"
};

const videoList = {
  moodVideoHorizontal: require("../../../public/video/help-block/mood-video/compress/mood-horizontal.mp4"),
  moodVideoVertical: require("../../../public/video/help-block/mood-video/compress/mood-vertical.mp4"),
  targetVideoHorizontal: require('../../../public/video/help-block/target-video/compress/target-horizontal.mp4'),
  targetVideoVertical: require('../../../public/video/help-block/target-video/compress/target-vertical.mp4'),
  behaviorVideoHorizontal: require('../../../public/video/help-block/behavior-video/compress/behavior-horizontal.mp4'),
  behaviorVideoVertical: require('../../../public/video/help-block/behavior-video/compress/behavior-vertical.mp4'),
  otherVideoHorizontal: require('../../../public/video/help-block/other-video/compress/other-horizontal.mp4'),
  otherVideoVertical: require('../../../public/video/help-block/other-video/compress/other-vertical.mp4'),
};

export default function BlockFourAskProblem() {
  const currentOpenListRef = useRef(null);
  const [isOpenList, setIsOpenList] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(videoNull);

  const listWrapperRef = useRef(null);
  const listElementRef = useRef(null);

  const askProblemsListClickHandler = evt => {
    if (!evt.target.closest(`[data-item]`)) {
      return;
    }

    const targetElement = evt.target.closest(`[data-item]`);

    if (isOpenList) {
	currentOpenListRef.current.classList.remove(styles.open_item);
	currentOpenListRef.current = null;
	setIsOpenList(!isOpenList);

	return;
    }

    currentOpenListRef.current = targetElement;

    if (targetElement.closest(`[data-item=${askProblemsItems.Mood}]`)) {
	targetElement.closest(`[data-item=${askProblemsItems.Mood}]`).classList.add(`${styles.open_item}`);
	setCurrentVideo(videoList.moodVideoHorizontal);
    } else if (targetElement.closest(`[data-item=${askProblemsItems.Target}]`)) {
	targetElement.closest(`[data-item=${askProblemsItems.Target}]`).classList.add(`${styles.open_item}`);
	setCurrentVideo(videoList.targetVideoHorizontal);
    } else if (targetElement.closest(`[data-item=${askProblemsItems.Behavior}]`)) {
	targetElement.closest(`[data-item=${askProblemsItems.Behavior}]`).classList.add(`${styles.open_item}`);
	setCurrentVideo(videoList.behaviorVideoHorizontal);
    } else if (targetElement.closest(`[data-item=${askProblemsItems.Other}]`)) {
	targetElement.closest(`[data-item=${askProblemsItems.Other}]`).classList.add(`${styles.open_item}`);
	setCurrentVideo(videoList.otherVideoHorizontal);
    }

    setIsOpenList(!isOpenList);
  };

  return (
    <article className={`gradient_background ${styles.block_four_ask_problem}`}>
      <div className="container_wrapper padding_wrapper">
        <div className={styles.block_wrapper}>
          <h2 className="h2">?? ?????? ?? ???????? ?????? ????????????</h2>
          <div ref={listWrapperRef} className={styles.problems_list_wrapper}>
            <ul
	      ref={listElementRef}
              onClick={askProblemsListClickHandler}
              className={`${styles.problems_list} ${isOpenList ? `${styles.open_list}` : ''}`}
            >
              <li
                data-item={askProblemsItems.Mood}
                className={styles.problem_item}
              >
                <div className={styles.heading_wrapper}>
                  <div className={styles.plus_icon_svg}>
                    <Image src={plusSvg} alt="???????????? ????????-??????????????" />
                  </div>
                  <h3 className={`h3 ${styles.item_heading}`}>
                    ???????????????? ?? ??????????????????????
                  </h3>
                </div>
                <ul className={`${styles.item_description_list} `}> 
                  <li className={styles.description_list_item}>
                    ???????????????????? ???????????????? ????????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ???????????? ???????????????????? ?? ?????????????? ??????
                  </li>
                  <li className={styles.description_list_item}>
                    ???????????????????????? ??????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ???????????????????? ??????????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ?????????????? ??????????, ?????????????????? ?? ?????????????????? ?? ????????????????
                  </li>
                </ul>
              </li>
              <li
                data-item={askProblemsItems.Target}
                className={styles.problem_item}
              >
                <div className={styles.heading_wrapper}>
                  <div className={styles.plus_icon_svg}>
                    <Image src={plusSvg} alt="???????????? ????????-??????????????" />
                  </div>
                  <h3 className={`h3 ${styles.item_heading}`}>
                    ?????????????????? ???????????????????? ?? ???????????????????? ??????????
                  </h3>
                </div>
                <ul className={`${styles.item_description_list}`}>
                  <li className={styles.description_list_item}>
                    ?????? ??????????????????, ????????????, ?????????????? ??????????????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ???????????? ????????????????????????????, ????????????????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ?????????????????????????? ??????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ?????????????????????? ??????????????????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ?????? ???????????? ??????????????????????????
                  </li>
                </ul>
              </li>
              <li
                data-item={askProblemsItems.Behavior}
                className={styles.problem_item}
              >
                <div className={styles.heading_wrapper}>
                  <div className={styles.plus_icon_svg}>
                    <Image src={plusSvg} alt="???????????? ????????-??????????????" />
                  </div>
                  <h3 className={`h3 ${styles.item_heading}`}>
                    ?????????????????????????? ??????????????????
                  </h3>
                </div>
                <ul className={`${styles.item_description_list}`}>
                  <li className={styles.description_list_item}>
                    ???????????? ?????????? ??????????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ???????????????????? ????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ?????????? ????????????????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ???????????? ?????????? ???????????????????????????? ??????????????????
                  </li>
                </ul>
              </li>
              <li
                data-item={askProblemsItems.Other}
                className={styles.problem_item}
              >
                <div className={styles.heading_wrapper}>
                  <div className={styles.plus_icon_svg}>
                    <Image src={plusSvg} alt="???????????? ????????-??????????????" />
                  </div>
                  <h3 className={`h3 ${styles.item_heading}`}>
                    ???????????? ????????????????
                  </h3>
                </div>
                <ul className={`${styles.item_description_list}`}>
                  <li className={styles.description_list_item}>
                    ???????????????????????? ????????????????????, ?????????????????????????? ?? ????????
                  </li>
                  <li className={styles.description_list_item}>
                    ?????????????? ?????????????????? ?? ???????????????? ????????????
                  </li>
                  <li className={styles.description_list_item}>
                    ?????????? ??????????????
                  </li>
                  <li className={styles.description_list_item}>??????????</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <video src={currentVideo} className={`${styles.video_background} ${isOpenList ? `${styles.visible_video}` : `${styles.hidden_video}`}`} autoPlay loop />
    </article>
  );
}
