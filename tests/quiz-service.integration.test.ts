import {
  createQuizService,
  deleteQuizService,
  getQuizService,
  updateQuizDataService,
  updateQuizSolutionService,
} from '@/lib/core/service'
import prisma from '@/lib/db/client'
import {faker} from '@faker-js/faker'

describe('Integration test: Quiz ', () => {
  describe('Integration test: createQuizService', () => {
    const word = faker.lorem.word()
    const codeLanguageId = faker.number.int({min: 1, max: 1000})
    const difficultyLevelId = faker.number.int({min: 1, max: 1000})
    const userId = faker.string.uuid()

    let createdQuiz: any

    beforeAll(async () => {
      await prisma.codeLanguage.create({
        data: {id: codeLanguageId, name: word},
      })
      await prisma.difficultyLevel.create({
        data: {id: difficultyLevelId, name: word},
      })
      await prisma.user.create({data: {id: userId, name: word}})
    })

    afterAll(async () => {
      const {quizData, quizSolution, quizTestCase} = createdQuiz

      await deleteQuizService({quizId: quizData.id})
      await prisma.codeLanguage.delete({where: {id: codeLanguageId}})
      await prisma.difficultyLevel.delete({where: {id: difficultyLevelId}})
      await prisma.user.delete({where: {id: userId}})
    })

    test('it should create new quiz and return quiz, solution, and testCases objects', async () => {
      const param = {
        quizData: {
          title: word,
          userId,
          codeLanguageId,
          difficultyLevelId,
          instruction: word,
          answer: word,
          defaultCode: word,
          locale: word,
        },
        quizSolution: [
          {
            code: word,
            sequence: 0,
            testRunner: word,
            importDirectives: word,
          },
          {
            code: word,
            sequence: 1,
            testRunner: word,
            importDirectives: word,
          },
        ],
        quizTestCases: [
          [
            {input: word, output: word},
            {input: word, output: word},
            {input: word, output: word},
          ],
          [
            {input: word, output: word},
            {input: word, output: word},
          ],
        ],
      }

      createdQuiz = await createQuizService(param)
      const quizId = createdQuiz.quizData.id
      const expectedQuiz: any = await getQuizService({quizId})
      delete expectedQuiz.quizData.codeLanguage

      expect(createdQuiz).toEqual(expectedQuiz)
    })
  })

  describe('Integration test: getQuizService', () => {
    const word = faker.lorem.word()
    const codeLanguageId = faker.number.int({min: 1, max: 1000})
    const difficultyLevelId = faker.number.int({min: 1, max: 1000})
    const userId = faker.string.uuid()

    let expectedQuiz: Record<string, any>
    let quizId: string
    let solutionId: string

    beforeAll(async () => {
      const createQuizParam = {
        quizData: {
          title: word,
          userId,
          codeLanguageId,
          difficultyLevelId,
          instruction: word,
          answer: word,
          defaultCode: word,
          locale: word,
        },
        quizSolution: [
          {
            code: word,
            sequence: faker.number.int({min: 1, max: 1000}),
            testRunner: word,
            importDirectives: word,
          },
        ],
        quizTestCases: [
          [
            {input: word, output: word},
            {input: word, output: word},
            {input: word, output: word},
          ],
        ],
      }

      await prisma.user.create({data: {id: userId, name: word}})
      await prisma.codeLanguage.create({
        data: {id: codeLanguageId, name: word},
      })
      await prisma.difficultyLevel.create({
        data: {id: difficultyLevelId, name: word},
      })
      expectedQuiz = await createQuizService(createQuizParam)

      quizId = expectedQuiz.quizData.id
      solutionId = expectedQuiz.quizSolution[0].id
    })

    afterAll(async () => {
      await prisma.testCase.deleteMany({where: {solutionId}})
      await prisma.solution.delete({where: {id: solutionId}})
      await prisma.quiz.delete({where: {id: quizId}})
      await prisma.codeLanguage.delete({where: {id: codeLanguageId}})
      await prisma.difficultyLevel.delete({where: {id: difficultyLevelId}})
      await prisma.user.delete({where: {id: userId}})
    })

    test('it should return quiz', async () => {
      const param = {quizId}
      const receivedQuiz: any = await getQuizService(param)
      delete receivedQuiz.quizData.codeLanguage
      expect(receivedQuiz).toEqual(expectedQuiz)
    })
  })

  describe('Integration test: updateQuizSolutionService', () => {
    const codeLanguageId = faker.number.int({min: 1, max: 1000})
    const difficultyLevelId = faker.number.int({min: 1, max: 1000})
    const userId = faker.string.uuid()

    let solutionId: string
    let quizId: string
    let createdQuiz: Record<string, any>

    beforeAll(async () => {
      const word = faker.lorem.word()

      const param = {
        quizData: {
          title: word,
          userId,
          codeLanguageId,
          difficultyLevelId,
          instruction: word,
          answer: word,
          defaultCode: word,
          locale: word,
        },
        quizSolution: [
          {
            code: word,
            sequence: faker.number.int({min: 1, max: 1000}),
            testRunner: word,
            importDirectives: word,
          },
        ],
        quizTestCases: [
          [
            {input: word, output: word},
            {input: word, output: word},
          ],
        ],
      }

      await prisma.codeLanguage.create({
        data: {id: codeLanguageId, name: word},
      })
      await prisma.difficultyLevel.create({
        data: {id: difficultyLevelId, name: word},
      })
      await prisma.user.create({data: {id: userId, name: word}})
      createdQuiz = await createQuizService(param)

      quizId = createdQuiz.quizData.id
      solutionId = createdQuiz.quizSolution[0].id
    })

    afterAll(async () => {
      await prisma.testCase.deleteMany({where: {solutionId: solutionId}})
      await prisma.solution.delete({where: {id: solutionId}})
      await prisma.quiz.delete({where: {id: quizId}})
      await prisma.codeLanguage.delete({where: {id: codeLanguageId}})
      await prisma.difficultyLevel.delete({where: {id: difficultyLevelId}})
      await prisma.user.delete({where: {id: userId}})
    })

    test('it should update and return quiz solution and test cases', async () => {
      const word = faker.lorem.word()
      const {quizData, quizSolution, quizTestCase} = createdQuiz

      const updateQuizSolutionParam = {
        quizSolution: [
          {
            solutionId: quizSolution[0].id,
            code: word,
            testRunner: word,
            importDirectives: word,
          },
        ],
        quizTestCase: [
          {testCaseId: quizTestCase[0].id, input: word, output: word},
          {testCaseId: quizTestCase[1].id, input: word, output: word},
        ],
      }

      const updatedQuiz = await updateQuizSolutionService(
        updateQuizSolutionParam,
      )
      const expectedQuiz: any = await getQuizService({quizId})
      delete expectedQuiz.quizData

      expect(updatedQuiz).toEqual(expectedQuiz)
    })
  })

  describe('Integration test: updateQuizDataService', () => {
    const codeLanguageId = faker.number.int({min: 1, max: 1000})
    const difficultyLevelId = faker.number.int({min: 1, max: 1000})
    const userId = faker.string.uuid()

    let solutionId: string
    let quizId: string

    beforeAll(async () => {
      const word = faker.lorem.word()

      const param = {
        quizData: {
          title: word,
          userId,
          codeLanguageId,
          difficultyLevelId,
          instruction: word,
          answer: word,
          defaultCode: word,
          locale: word,
        },
        quizSolution: [
          {
            code: word,
            sequence: faker.number.int({min: 1, max: 1000}),
            testRunner: word,
            importDirectives: word,
          },
        ],
        quizTestCases: [
          [
            {input: word, output: word},
            {input: word, output: word},
            {input: word, output: word},
          ],
        ],
      }

      await prisma.codeLanguage.create({
        data: {id: codeLanguageId, name: word},
      })
      await prisma.difficultyLevel.create({
        data: {id: difficultyLevelId, name: word},
      })
      await prisma.user.create({data: {id: userId, name: word}})
      const createdQuiz = await createQuizService(param)

      quizId = createdQuiz.quizData.id
      solutionId = createdQuiz.quizSolution[0].id
    })

    afterAll(async () => {
      await prisma.testCase.deleteMany({where: {solutionId: solutionId}})
      await prisma.solution.delete({where: {id: solutionId}})
      await prisma.quiz.delete({where: {id: quizId}})
      await prisma.codeLanguage.delete({where: {id: codeLanguageId}})
      await prisma.difficultyLevel.delete({where: {id: difficultyLevelId}})
      await prisma.user.delete({where: {id: userId}})
    })

    test('it should update and return quiz data', async () => {
      const word = faker.lorem.word()

      const updateQuizParam = {
        quizData: {
          id: quizId,
          title: word,
          userId,
          codeLanguageId,
          difficultyLevelId,
          instruction: word,
          answer: word,
          defaultCode: word,
          locale: word,
        },
      }

      const updatedQuiz = await updateQuizDataService(updateQuizParam)
      const expectedQuiz: any = await getQuizService({quizId})
      delete expectedQuiz.quizData.codeLanguage

      expect(updatedQuiz).toEqual(expectedQuiz.quizData)
    })
  })

  describe('Integration test: deleteQuizService', () => {
    const word = faker.lorem.word()
    const codeLanguageId = faker.number.int({min: 1, max: 1000})
    const difficultyLevelId = faker.number.int({min: 1, max: 1000})
    const userId = faker.string.uuid()

    let quizId: string
    let solutionId: string

    beforeAll(async () => {
      const createQuizParam = {
        quizData: {
          title: word,
          userId,
          codeLanguageId,
          difficultyLevelId,
          instruction: word,
          answer: word,
          defaultCode: word,
          locale: word,
        },
        quizSolution: [
          {
            code: word,
            sequence: faker.number.int({min: 1, max: 1000}),
            testRunner: word,
            importDirectives: word,
          },
        ],
        quizTestCases: [
          [
            {input: word, output: word},
            {input: word, output: word},
            {input: word, output: word},
          ],
        ],
      }

      await prisma.user.create({data: {id: userId, name: word}})
      await prisma.codeLanguage.create({
        data: {id: codeLanguageId, name: word},
      })
      await prisma.difficultyLevel.create({
        data: {id: difficultyLevelId, name: word},
      })
      const createdQuiz = await createQuizService(createQuizParam)

      quizId = createdQuiz.quizData.id
      solutionId = createdQuiz.quizSolution[0].id
    })

    afterAll(async () => {
      await prisma.codeLanguage.delete({where: {id: codeLanguageId}})
      await prisma.difficultyLevel.delete({where: {id: difficultyLevelId}})
      await prisma.user.delete({where: {id: userId}})
    })

    test('it should update and return quiz', async () => {
      await deleteQuizService({quizId})
      const receivedQuiz = await getQuizService({quizId})
      const expectedResult = {}

      expect(receivedQuiz).toEqual(expectedResult)
    })
  })
})
