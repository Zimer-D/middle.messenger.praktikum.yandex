import { TProps } from "../../types/types";

export const data: TProps = {
    chats: {
      title: 'Messages',
      count: 12,
      items: [
        {
          id: 1,
          message: 'ты где??',
          name: 'Nick',
          timeLastMessage: '10:30',
          unread: 3
        },
        {
          id: 2,
          message: 'го курить',
          name: 'vasya',
          timeLastMessage: '12:25',
          unread: 1
        },
        {
          id: 3,
          message: 'ниче не понял',
          name: 'Boss',
          timeLastMessage: '11:15',
          unread: 0
        },
        {
          id: 4,
          message: 'react рулит',
          name: 'Lena',
          timeLastMessage: '10:00',
          unread: 0
        },
        {
          id: 5,
          message: 'что это???',
          name: 'Mashs',
          timeLastMessage: '05:30',
          unread: 0
        },
      ],
    },
    messages: {
      name: 'Tanay',
      photo: 'images/user-3.jpg',
      messages: [
        {
          id: 1, text: 'где проект?', user_id: 3, time: '16:20', status: 1
        },
        {
          id: 2, text: 'АЛЕ', user_id: 3, time: '16:21', status: 1
        },
        {
          id: 3, text: 'какой?', user_id: 0, time: '16:22', status: 1
        },
        {
          id: 4, text: 'которйый надо было сделать вчера!!!', user_id: 3, time: '16:22', status: 1
        },
        {
          id: 5, text: 'упс...', user_id: 0, time: '16:24', status: 1
        },
        {
          id: 6, text: 'ты уволен', user_id: 3, time: '16:26', status: 1
        },
        {
          id: 7,
          text: 'ахаха через пол часа пришлю',
          user_id: 0,
          time: '16:26',
          status: 0
        },
      ],
    },
  };