import React, { Component, ReactNode } from 'react';
import { ENTITY_TYPES, REQUEST_METHODS } from '../../common/consts';
import { HttpService } from '../../common/http-service/http-service';
import { MODELS } from '../../common/models';
import { isEmpty } from '../../common/helpers';
import { isTransformResponseBodyInModel } from '../../common/interfaces';

const http = HttpService.getInstance();

interface DataProviderProps {
  entityType: ENTITY_TYPES;
  requestBody?: any;
  children(childData: any): ReactNode;
}

interface DataProviderState {
  entityData: any;
  dependenciesData?: { entityType: ENTITY_TYPES; entityData: any }[];
}

export class DataProvider extends Component<DataProviderProps, DataProviderState> {
  public state = { entityData: null, dependenciesData: [] };

  public componentDidMount() {
    this.fetchData();
    this.fetchDependencies();
  }

  private fetchData = () => {
    const { entityType, requestBody } = this.props;

    switch (MODELS[entityType].requestMethod) {
      case REQUEST_METHODS.POST:
        http.post(MODELS[entityType].url, undefined, JSON.stringify(requestBody)).then(result => {
          if (isTransformResponseBodyInModel(MODELS[entityType])) {
            this.setState({ entityData: MODELS[entityType].transformResponseBody!(result).data });
          } else {
            this.setState({ entityData: result.data });
          }
        });
        break;
      default:
        http.get(MODELS[entityType].url).then(result => {
          if (isTransformResponseBodyInModel(MODELS[entityType])) {
            this.setState({ entityData: MODELS[entityType].transformResponseBody!(result).data });
          } else {
            this.setState({ entityData: result.data });
          }
        });
    }
  };

  private fetchDependencies = () => {
    const { entityType } = this.props;
    const { dependencies } = MODELS[entityType];

    if (!isEmpty(dependencies)) {
      /* eslint-disable */
      dependencies?.forEach(dependency => {
        const { entityType: dependencyEntityType } = dependency;
        const { dependenciesData } = this.state;
        const requestBody = null;

        switch (MODELS[dependencyEntityType].requestMethod) {
          case REQUEST_METHODS.POST:
            http.post(MODELS[dependencyEntityType].url, undefined, JSON.stringify(requestBody)).then(result => {
              if (isTransformResponseBodyInModel(MODELS[dependencyEntityType])) {
                this.setState({
                  dependenciesData: [
                    ...dependenciesData,
                    {
                      entityType: dependencyEntityType,
                      entityData: MODELS[dependencyEntityType].transformResponseBody!(result).data,
                    },
                  ],
                });
              } else {
                this.setState({
                  dependenciesData: [
                    ...dependenciesData,
                    {
                      entityType: dependencyEntityType,
                      entityData: result.data,
                    },
                  ],
                });
              }
            });
            break;
          default:
            http.get(MODELS[dependencyEntityType].url).then(result => {
              if (isTransformResponseBodyInModel(MODELS[dependencyEntityType])) {
                this.setState({
                  dependenciesData: [
                    ...dependenciesData,
                    {
                      entityType: dependencyEntityType,
                      entityData: MODELS[dependencyEntityType].transformResponseBody!(result).data,
                    },
                  ],
                });
              } else {
                this.setState({
                  dependenciesData: [
                    ...dependenciesData,
                    { entityType: dependencyEntityType, entityData: result.data },
                  ],
                });
              }
            });
        }
      });
    }
  };

  public render = () => {
    const { children } = this.props;
    return children(this.state);
  };
}
