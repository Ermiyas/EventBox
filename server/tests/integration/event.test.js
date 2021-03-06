import { expect } from 'chai'
import chalk from 'chalk'
import * as userApi from './userApi'
import * as eventApi from './eventApi'

describe('event', () => {
  describe('detailEvent(id: ID!): [Event]', () => {
    it('should returns details of event', async () => {
      const expectedResult = {
        data: {
          event:
          {
            title: 'Event01',
            images: {
              thumbnail: 'https://i.imgur.com/3PuAloY.png'
            },
            shortDescription: 'short',
            description: '{\"blocks\":[{\"key\":\"6j5u\",\"text\":\"des\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}',
            organizationName: 'VLU',
            organizationLogo: 'https://i.imgur.com/f1Q97JB.png',
            organizationDescription: 'VLU',
            startTime: '1547107310490',
            endTime: '1547712118533',
            location: 'Lucy and Jack Plaza',
            address: '123/123 Nguyễn Khắc Nhu'
          }
        }
      }

      const { data: { data: { signIn: { token } } } } = await userApi.signIn({ username: 'toai', password: '123' })
      const result = await eventApi.detailEvent({ id: '5c3d93883997b71214c014e1' }, token)

      expect(result.data).to.eql(expectedResult)
    })

  })
  describe('personalEvent(id: ID!): [Event]', () => {
    it('should returns list of your event', async () => {
      const expectedResult = {
        data: {
          event:
          {
            title: 'Event01',
            images: {
              thumbnail: 'https://i.imgur.com/3PuAloY.png'
            },
            status: 'draft',
            user: {
              username: 'toai'
            },
            updatedAt: '1547539336139'
          }
        }
      }
      const { data: { data: { signIn: { token } } } } = await userApi.signIn({ username: 'toai', password: '123' })
      const result = await eventApi.personalEvent({ id: '5c3d93883997b71214c014e1' }, token)
      // console.log(chalk.blue(JSON.stringify(result.data)))
      expect(result.data).to.eql(expectedResult)
    })

  })
})

describe('listEventsHomepage', () => {
  describe('events(status:String, limit: Int!): [Events]', () => {
    it('should returns List of event', async () => {
      const expectedResult = {
        data: {
          events: {
            edges: [
              {
                id: '5c42162cae614e5a386ea47b',
                title: 'Event01',
                status:'draft',
                createdAt: '1547834924241',
                images: {
                  thumbnail: 'https://i.imgur.com/3PuAloY.png'
                },
                user: {
                  id: '5c35e34fc90cbf0a105a9ed7',
                  username: 'toai'
                }
              }, {
                id: "5c421454ae614e5a386ea47a",
                title: "Event01",
                status:'draft',
                createdAt: "1547834452716",
                images: {
                  thumbnail: "https://i.imgur.com/3PuAloY.png"
                },
                user: {
                  id: "5c35e34fc90cbf0a105a9ed7",
                  username: "toai"
                }
              },
            ]
          }
        }
      }
      const { data: { data: { signIn: { token } } } } = await userApi.signIn({ username: 'toai', password: '123' })
      const result = await eventApi.listEventsHomepage({ status: "draft", limit:2 }, token)

      expect(result.data).to.eql(expectedResult)
    })

  })

  describe('deleteEvent', () => {
    it('should return an error ')
  })
})

describe('createEvent', () => {
  describe('createEvent($title: String!, $thumbnail: String!, $description: String!, $shortDescription: String,$organizationName: String!, $organizationLogo: String, $organizationDescription: String, $startTime: String, $endTime: String, $location: String, $address: String): [Ev]', () => {
    it('return create new event', async () => {
      let expectedResult = {
        data: {
          createEvent: {
            title: 'Event01',
            description: "{\"blocks\":[{\"key\":\"be8dd\",\"text\":\"des\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
            status: 'draft'
          }
        }
      }
      const { data: { data: { signIn: { token } } } } = await userApi.signIn({ username: 'toai', password: '123' })
      // console.log('token: ',token)
      let result
      try {
        result = await eventApi.createEvent({
          title: "Event01",
          thumbnail: "https://i.imgur.com/3PuAloY.png",
          shortDescription: "short",
          description: "{\"blocks\":[{\"key\":\"be8dd\",\"text\":\"des\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
          organizationName: "Vanlang University",
          organizationLogo: "https://i.imgur.com/f1Q97JB.png",
          organizationDescription: "VLU",
          startTime: "1547121898322",
          endTime: "1547726700642",
          location: "Lucy and Jack Plaza",
          address: "123/123 Nguyễn Khắc Nhu"
        }, token)
        // console.log('result: ', result.data)
      } catch (error) {
        console.log('err: ', error.response.data);
      }
      console.log('expectedResult: ', result.data)
      expect(result.data).to.eql(expectedResult)
    })
  })
})
// describe('updateEvent', () => {
//   describe('updateEvent($id: ID!, $title: String!, $thumbnail: String!, $description: String!, $shortDescription: String, $categoryId: String, $location: String, $regFrom: String, $regTo: String, $organizationName: String!, $organizationLogo: String, $organizationDescription: String, $startTime: String, $endTime: String, $address: String): [uEv]', () => {
//     it.only('return update new event', async () => {
//       let expectedResult = {
//         data: {
//           updateEvent: {
//             id: '5c3e9f3dfdc79842649ae1f6',
//             title: 'Event02',
//             description: "{\"blocks\":[{\"key\":\"be8dd\",\"text\":\"des\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
//             status: 'draft'
//           }
//         }
//       }
//       const { data: { data: { signIn: { token } } } } = await userApi.signIn({ username: 'toai', password: '123' })
//       // console.log('token: ',token)
//       let result
//       try {
//         result = await eventApi.updateEvent({
//           id: '5c3e9f3dfdc79842649ae1f6',
//           title: "Event02",
//           thumbnail: "https://i.imgur.com/3PuAloY.png",
//           shortDescription: "short",
//           description: "{\"blocks\":[{\"key\":\"be8dd\",\"text\":\"des\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
//           organizationName: "Vanlang University",
//           organizationLogo: "https://i.imgur.com/f1Q97JB.png",
//           organizationDescription: "VLU",
//           startTime: "1547121898322",
//           endTime: "1547726700642",
//           location: "Lucy and Jack Plaza",
//           address: "123/123 Nguyễn Khắc Nhu"
//         }, token)
//         // console.log('result: ', result.data)
//       } catch (error) {
//         console.log('err: ', error.response.data);
//       }
//       console.log('expectedResult: ', result.data)
//       expect(result.data).to.eql(expectedResult)
//     })
//   })
// })
