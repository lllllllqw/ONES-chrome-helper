import './newTab.css';

function getSuffix(filename: string) {
    if (filename) {
        const fileArr = filename.split('.');
        return fileArr[fileArr.length - 1];
    }
    return '';
}

function isVideoType(filename: string) {
    if (filename) {
        const videoList = ['mp4', 'm2v', 'mkv', 'mov', 'avi', 'flv', 'webm'];
        const suffix = getSuffix(filename);
        return videoList.includes(suffix);
    }
    return false;
}

function getUrlParams() {
    const searchReg = /(.*)\/project\/(.*?)\/team\/(\w+)(\/component\/(\w+))?.*?\/task\/(\w+)\/?/;
    const match = window.location.href.match(searchReg);
    if (match) {
        let branch = match[2].replace('#', '');
        if (branch.includes('workspace')) {
            branch = '';
        }
        return {
            baseUrl: match[1],
            branch,
            teamUUID: match[3],
            taskUUID: match[6],
        };
    }
    return null;
}

async function getAttachments() {
    const params = getUrlParams();
    if (params) {
        const url = `${params.baseUrl}/project/${params.branch}api/project/team/${params.teamUUID}/task/${params.taskUUID}/attachments?since=0`;
        const result = await fetch(url).then((res) => res.json());
        if (result.attachments) {
            return result.attachments;
        }
        alert('获取文件信息失败');
    }
    return false;
}

function setNewTabContent(res: { name: string; url: string }) {
    const titleEl = document.querySelector('.task-base-title textarea.ant-input');
    if (!titleEl) {
        return;
    }
    const title = titleEl.innerHTML;
    const videoWindow = window.open('', '_blank', '', true);
    if (!videoWindow) {
        return;
    }
    videoWindow.document.write(`
        <title>${res.name}</title>
        <style>
        body{
            margin: 0;
            background: #eee;
        }
        h3{
            margin: 5px 0;
        }
        .xlzy-content{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                }
                .xlzy-video{
                width: auto;
                height: 90vh;
                outline: none;
                }
        </style>
            <div class="xlzy-content">
            <h3>${title}</h3>
            <span>${res.name}</span>
                <video
                style="width: auto;height: 90vh;"
                    class="xlzy-video"
                    autoplay="autoplay"
                    controls
                    src="${res.url}"></video>
            </div>
        `);
}

function getPreviewBox(filename = '', inComment = false) {
    const preview = `
            <svg class="ui-icon icon_new-tab" viewBox="0 0 32 32">
            <use xlink:href="#icon_new-tab"></use>
            </svg>`;
    const previewBox = document.createElement('div');
    previewBox.className = inComment ? 'attachment-download-icon xlzy' : 'ui-circle-icon';
    previewBox.innerHTML = preview;
    previewBox.addEventListener('click', async (event) => {
        event.stopPropagation();
        const attachments = await getAttachments();
        let attachment;
        const videoIndex = attachments.findIndex((a: { name: string }) => a.name === filename);
        if (videoIndex > -1) {
            attachment = attachments[videoIndex];
        }
        const params = getUrlParams();
        if (!params) {
            return;
        }
        const url = `${params.baseUrl}/project/${params.branch}api/project/team/${params.teamUUID}/res/attachment/${attachment.uuid}?op=attname%${attachment.name}`;
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                if (res.mime.includes('video')) {
                    setNewTabContent(res);
                } else {
                    alert('错误的视频文件格式');
                }
            });
    });
    return previewBox;
}

function handleVideo(inComment: boolean) {
    const itemClass = inComment ? '.attachment-preview-card' : '.resource-item-container';
    const infoResourceItems = document.querySelectorAll(itemClass);
    if (infoResourceItems.length !== 0) {
        infoResourceItems.forEach((resourceItem) => {
            const newTabIcon = resourceItem.querySelector('.icon_new-tab');
            const filenameEl = resourceItem.querySelector('.resource-info-name');
            if (!filenameEl) {
                return;
            }
            const filename = filenameEl.innerHTML;
            const resourceActions = resourceItem.querySelector('.resource-actions');
            if (isVideoType(filename)) {
                const previewBox = getPreviewBox(filename, inComment);
                const hasIconBox = inComment ? true : resourceActions;
                if (hasIconBox && !newTabIcon) {
                    const box = inComment ? resourceItem : resourceActions;
                    if (box) {
                        box.append(previewBox);
                    }
                }
            } else if (newTabIcon) {
                newTabIcon.remove();
            }
        });
    }
}

export const withVideoPreview = (): void => {
    // 解决ONES Project附件中视频文件无法在线预览的临时解决方案。
    setInterval(() => {
        handleVideo(false); // 信息栏视频
        handleVideo(true); // 评论栏视频
    }, 1000);
};
