import { passOnSuccess, ScenarioMockApi, mockapi, json, MockApi } from "@azure-tools/cadl-ranch-api";

export const Scenarios: Record<string, ScenarioMockApi> = {};

interface MockApiGetPut {
  getNonNull: MockApi;
  getNull: MockApi;
  patchNonNull: MockApi;
  patchNull: MockApi;
}

/**
 * Return the get and put operations
 * @param route The route within /type/property/nullable for your function.
 * @param value The value you are expecting and will return
 */
function createMockApis(route: string, value: any): MockApiGetPut {
  const url = `/type/property/nullable/${route}`;
  const nonNullUrl = `${url}/non-null`;
  const nullUrl = `${url}/null`;
  const nonNullBody = { requiredProperty: "foo", nullableProperty: value };
  const nullBody = { requiredProperty: "foo", nullableProperty: null };
  const getNonNull = mockapi.get(nonNullUrl, (req) => {
    return {
      status: 200,
      body: json(nonNullBody),
    };
  });
  const getNull = mockapi.get(nullUrl, (req) => {
    return {
      status: 200,
      body: json(nullBody),
    };
  });
  const patchNonNull = mockapi.patch(nonNullUrl, (req) => {
    const expectedBody = JSON.parse(JSON.stringify(nonNullBody)); // deep clone
    req.expect.coercedBodyEquals(expectedBody);
    return {
      status: 204,
    };
  });
  const patchNull = mockapi.patch(nullUrl, (req) => {
    req.expect.bodyEquals(nullBody);
    return {
      status: 204,
    };
  });
  return {
    getNonNull: getNonNull,
    getNull: getNull,
    patchNonNull: patchNonNull,
    patchNull: patchNull,
  };
}

const stringMock = createMockApis("string", "hello");
Scenarios.Type_Property_Nullable_String_getNonNull = passOnSuccess(stringMock.getNonNull);
Scenarios.Type_Property_Nullable_String_getNull = passOnSuccess(stringMock.getNull);
Scenarios.Type_Property_Nullable_String_patchNonNull = passOnSuccess(stringMock.patchNonNull);
Scenarios.Type_Property_Nullable_String_patchNull = passOnSuccess(stringMock.patchNull);

const bytesMock = createMockApis("bytes", "aGVsbG8sIHdvcmxkIQ==");
Scenarios.Type_Property_Nullable_Bytes_getNonNull = passOnSuccess(bytesMock.getNonNull);
Scenarios.Type_Property_Nullable_Bytes_getNull = passOnSuccess(bytesMock.getNull);
Scenarios.Type_Property_Nullable_Bytes_patchNonNull = passOnSuccess(bytesMock.patchNonNull);
Scenarios.Type_Property_Nullable_Bytes_patchNull = passOnSuccess(bytesMock.patchNull);

const datetimeMock = createMockApis("datetime", "2022-08-26T18:38:00Z");
Scenarios.Type_Property_Nullable_Datetime_getNonNull = passOnSuccess(datetimeMock.getNonNull);
Scenarios.Type_Property_Nullable_Datetime_getNull = passOnSuccess(datetimeMock.getNull);
Scenarios.Type_Property_Nullable_Datetime_patchNonNull = passOnSuccess(datetimeMock.patchNonNull);
Scenarios.Type_Property_Nullable_Datetime_patchNull = passOnSuccess(datetimeMock.patchNull);

const durationMock = createMockApis("duration", "P123DT22H14M12.011S");
Scenarios.Type_Property_Nullable_Duration_getNonNull = passOnSuccess(durationMock.getNonNull);
Scenarios.Type_Property_Nullable_Duration_getNull = passOnSuccess(durationMock.getNull);
Scenarios.Type_Property_Nullable_Duration_patchNonNull = passOnSuccess(durationMock.patchNonNull);
Scenarios.Type_Property_Nullable_Duration_patchNull = passOnSuccess(durationMock.patchNull);

const collectionsBytesMock = createMockApis("collections/bytes", ["aGVsbG8sIHdvcmxkIQ==", "aGVsbG8sIHdvcmxkIQ=="]);
Scenarios.Type_Property_Nullable_CollectionsByte_getNonNull = passOnSuccess(collectionsBytesMock.getNonNull);
Scenarios.Type_Property_Nullable_CollectionsByte_getNull = passOnSuccess(collectionsBytesMock.getNull);
Scenarios.Type_Property_Nullable_CollectionsByte_patchNonNull = passOnSuccess(collectionsBytesMock.patchNonNull);
Scenarios.Type_Property_Nullable_CollectionsByte_patchNull = passOnSuccess(collectionsBytesMock.patchNull);

const collectionsModelMock = createMockApis("collections/model", [{ property: "hello" }, { property: "world" }]);
Scenarios.Type_Property_Nullable_CollectionsModel_getNonNull = passOnSuccess(collectionsModelMock.getNonNull);
Scenarios.Type_Property_Nullable_CollectionsModel_getNull = passOnSuccess(collectionsModelMock.getNull);
Scenarios.Type_Property_Nullable_CollectionsModel_patchNonNull = passOnSuccess(collectionsModelMock.patchNonNull);
Scenarios.Type_Property_Nullable_CollectionsModel_patchNull = passOnSuccess(collectionsModelMock.patchNull);

const collectionsStringMock = createMockApis("collections/string", ["hello", "world"]);
Scenarios.Type_Property_Nullable_CollectionsString_getNonNull = passOnSuccess(collectionsStringMock.getNonNull);
Scenarios.Type_Property_Nullable_CollectionsString_getNull = passOnSuccess(collectionsStringMock.getNull);
Scenarios.Type_Property_Nullable_CollectionsString_patchNonNull = passOnSuccess(collectionsStringMock.patchNonNull);
Scenarios.Type_Property_Nullable_CollectionsString_patchNull = passOnSuccess(collectionsStringMock.patchNull);
