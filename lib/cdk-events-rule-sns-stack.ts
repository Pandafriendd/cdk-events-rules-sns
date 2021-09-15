import * as cdk from '@aws-cdk/core';

import * as sns from "@aws-cdk/aws-sns";
import * as events from "@aws-cdk/aws-events";
import * as targets from "@aws-cdk/aws-events-targets";


export class CdkEventsRuleSnsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    
    const topic = new sns.Topic(this, "topic");
    
    const rule = new events.Rule(this, "testRule", {
      schedule: events.Schedule.expression('rate(1 minute)')
    });
    
    rule.addTarget(
      new targets.SnsTopic(topic, {
          message: events.RuleTargetInput.fromObject(
            {
              DataType: `This_is_a_${events.EventField.fromPath('$.detail-type')}`,
              RuleName: `<aws.events.rule-name>`,
              RuleArn: `<aws.events.rule-arn>`,
              Time: `<aws.events.event.ingestion-time>`
            }
          )
      })
    );
    
    
    
  }
}
