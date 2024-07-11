// const socketIO = require('socket.io');
const fs = require('fs');
const path = require('path');

var chatRooms = {};
var roomTimers = {};
var roomNum = "";
var limit = 0;

module.exports = (io) => {

    io.on('connection', (socket) => {
        console.log("새로운 사용자 접속")
        
        // 채팅방 초기화 시간을 설정한다.
        const resetTime = 300 * 1000; // 5분
        
        // 저장된 채팅 파일을 불러오는 함수
        socket.on('readChatFile', (roomId, receiveId, sendId) => {
    
            if (chatRooms[roomId].length > 1) {
    
                // 구매자를 필터링하여 채팅방에 포함되어있는지 확인
                const result = chatRooms[roomId].filter(item => item.id != receiveId)
    
                // 채팅방에 포함되어있고 내가 구매자면 불러올 파일 경로를 생성
                if (result[0].id == sendId || receiveId == sendId) {
                    filePath = path.join( __dirname, "../", "../", "public", "chat", roomId, receiveId, `${result[0].id}.txt` );
                    
                    // 파일이 생성이 되어있으면 불러오고 아니면 로그만 출력
                    if (fs.existsSync(filePath)) {
                        fs.readFile(filePath, 'utf8', (err, data) => {
                            if (err) {
                                console.error('이전 채팅 내용을 읽어오는 중 오류 발생:', err);
                            } else {
                                previousChatMessages = data;
                                chatRooms[roomId].forEach((socket) => {
                                    socket.emit('readChatFile', previousChatMessages, roomId, receiveId, sendId)
                                })
                            }
                        });
                    }
                }
            }
        })
    
    
    
        // 사용자가 연결되었을때 console로 출력
        console.log('a user connected');
        
    
    
        // 클라이언트로부터 connectUser의 이름으로 요청이 올때 처리할 함수
        socket.on('connectUser', (roomId, userId, receiveId) => {
            roomNum = roomId;
            console.log()
            if (chatRooms[roomId] == null){
                chatRooms[roomId] = []
            } 
            socket.id = userId

    
            // 채팅방에 구매자가 이미 포함되어있는지 확인한다.
            const result = chatRooms[roomId].find(socket => socket.id === userId);
            // 포함되어있지 않으면 채팅방에 구매자를 포함시킨다.
            if (result == null) {
    
                // 이미 두명이 채팅중일 경우 메인페이지로 리다이렉트
                console.log('chatRoomslength : ', chatRooms[roomId].length)
                if (chatRooms[roomId].length == 2) {
                    limit = 1;
                    socket.emit('returnMainPage');
                    return;
                } 
                // 한명이 대기중일경우
                else if (chatRooms[roomId].length == 1) {
                    // 한명이 대기중인데 대기중인 사람이 판매자일경우 
                    // 현재 접속한 사용자를 채팅방에 추가
                    if (chatRooms[roomId][0].id == receiveId) {
                        chatRooms[roomId].push(socket);
    
                    // 판매자가 아닐 경우 메인페이지로 이동
                    } else {
                        if (userId == receiveId) {
                            chatRooms[roomId].push(socket);
                        } else {
                            socket.emit('returnMainPage')
                            return;
                        }
                    }
                // 한명도 없을때 아무나
                } else {
                    chatRooms[roomId].push(socket);
                }
            } 
            // 포함되어있으면 기존 정보를 삭제하고 다시 포함시킨다.
            // 소켓정보가 변경되어서 새로넣어줌...
            else {
                chatRooms[roomId] = chatRooms[roomId].filter(item => item.id != userId)
                chatRooms[roomId].push(socket);
            }
            resetChatRoomTimer(roomId, receiveId, userId)
    
            chatRooms[roomId].forEach( (socket) => {
                socket.emit('readChat', roomId, receiveId, userId )
            })
    
            // setTimeout(() => {
                // 원하는 작업을 수행합니다.
                chatRooms[roomId].forEach( (socket) => {
                    socket.emit('userConnected', userId)
                })
            // }, 500);
    
            
        })
    
    
        // 사용자로부터 chat message 라는 요청이 들어왔을때 처리하는 함수
        socket.on('chat message', (msg, roomId, receiveId, sendId) => {
            const timestamp = new Date().toISOString();
            if (chatRooms[roomId] != null){
                chatRooms[roomId].forEach( (socket) => {
                    socket.emit('chat message', msg, sendId, timestamp);
                    // 사용자페이지의 chat message를 실행하고 msg와 cookie값을 전달.
                })
            }
            // 채팅룸삭제 타이머를 초기화한다.
            resetChatRoomTimer(roomId, receiveId, sendId)
            if (chatRooms[roomId].length > 1) {
                saveMessageToFile(msg, roomId, receiveId, sendId, timestamp)
                // 채팅 내용 저장 함수를 호출
            } 
    
    
        })
    
        function getTime() {
            const time = new Date().toISOString();
            const result = time.split(':');
    
        }
        
    
    
    
        // socket 연결이 끊어졌을때 실행할 동작
        socket.on('disconnect', () => {
            if (limit == 1) {
                limit = 0;
            } else {
                if (!roomNum) {
                    
                } else {
                    if (chatRooms[roomNum]) {
                        if (chatRooms[roomNum].length > 1) {
                            chatRooms[roomNum].forEach((socket) => {
                                socket.emit('resetChatCount');
                                socket.emit('userDisconnect')
                            })
                        }
                        
                        // 현재 종료되는 socket을 방에서 제거한다.
                        chatRooms[roomNum] = chatRooms[roomNum].filter(data => data.id != socket.id)
                        
                        // 방에 아무런 값도 없으면 방 자체를 삭제한다.
                        if (chatRooms[roomNum].length == 0) {
                            delete chatRooms[roomNum];
                        }
                    }
                }
            }
        });
    
    
    
    
    
    
        //채팅방이 생성된 후 일정 시간이 지나면 채팅룸이 사라진다.
        function closeChatRoom(roomId, receiveId, sendId) {
            console.log("roomId : ", roomId)
            console.log("rec : ", receiveId)
            console.log("send : ", sendId)
            const filePath = path.join( __dirname, "../", "../", "public", "chat", roomId);
            console.log("시간이 지나 채팅방이 사라집니다.");
            console.log(fs.existsSync(filePath))
            if (fs.existsSync(filePath)) {
                console.log("폴더가 있음")
                fs.rm(filePath, { recursive: true }, (err) => {
                    if (err) {
                        console.error('폴더 삭제 중 오류 발생', err);
                        return;
                    }
                    console.log('폴더 삭제 완료');
                });
            }
            console.log("방삭제")
            delete chatRooms[roomId];
            clearTimeout(roomTimers[roomId]);
        }
    
        // 채팅방이 생성된 후 채팅을 시도하면 삭제까지의 시간이 초기화된다.
        function resetChatRoomTimer(roomId, receiveId, sendId) {
            console.log("시간 초기화")
            if (roomTimers[roomId]) {
                clearTimeout(roomTimers[roomId]);
            }
    
            roomTimers[roomId] = setTimeout(() => {
                closeChatRoom(roomId, receiveId, sendId);
                
            }, resetTime)
        }
    
    
    
        //주고받는 대화가 저장될 수 있게 설정한다.
        function saveMessageToFile(message, roomId, receiveId, sendId, timestamp) {
    
            const folderPath = path.join( __dirname, "../", "../", "public", "chat", roomId, receiveId);
            // const folderPath = path.join(__dirname, 'public', 'chat', roomId, receiveId);
            // 폴더를 생성할 경로를 지정한다.
    
            // 폴더가 존재하지 않으면 생성
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true }, (err) => {
                    if (err) {
                        console.error('폴더 생성 중 오류 발생:', err);
                    } else {
                        console.log('폴더 생성 완료:', folderPath);
                    }
                });
            }
            
            var filePath = "";
    
    
            const result = chatRooms[roomId].filter(item => item.id != receiveId)
    
            
            filePath = path.join(folderPath, `${result[0].id}.txt`);
            // filePath형식의 파일이 있지 않을경우 내용 실행
            if (fs.existsSync(filePath)) {
                fs.appendFile(filePath, `${timestamp}:${sendId}:${message}\t`, (err) => {
                    if (err) {
                        console.error('파일에 메시지를 저장하는 중 오류가 발생했습니다:', err);
                    } else {
                        console.log('메시지가 파일에 저장되었습니다.');
                    }
                });
            } else {
                fs.writeFile(filePath, `${timestamp}:${sendId}:${message}\t`, (err) => {
                    if (err) {
                        console.error('파일에 메시지를 저장하는 중 오류가 발생했습니다:', err);
                    } else {
                        console.log('메시지가 파일에 저장되었습니다.');
                    }
                });
            }
        }
    
        socket.on('roomcheck', () => {
            console.log(chatRooms)
        })
    
    
    });
}    
