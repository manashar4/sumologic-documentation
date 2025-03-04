---
id: aws-cloudtrail
title: AWS CloudTrail
sidebar_label: AWS CloudTrail
description: Configure a CloudTrail source on a hosted collector to ingest CloudTrail log messages to be parsed by CSE's CloudTrail system parser.
---

This section has instructions for collecting AWS CloudTrail log messages and sending them to Sumo Logic to be ingested by CSE.

Sumo Logic CSE supports the default AWS CloudTrail log format which includes all version 2 fields. See [AWS CloudTrail log records documentation](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html#flow-logs-fields) for more details.

## Step 1: Enable AWS CloudTrail logs

In this step, you configure AWS CloudTrail logging in AWS as described
in AWS Help.

1. Unless you’ve already done so, [Configure CloudTrail in AWS](http://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-add-a-trail-using-the-console.html).
1. Before configuring collection, you need to grant Sumo Logic permission to access your AWS data. For more information see Grant Access to an AWS Product.

## Step 2: Configure collection

In this step, you configure an HTTP Source to collect AWS CloudTrail log messages. You can configure the source on an existing Hosted Collector or create a new collector. If you’re going to use an existing collector, jump to [Configure an CloudTrail Source](#configure-an-aws-cloudtrail-source) below. Otherwise, create a new collector as described in [Configure a hosted collector](#configure-a-hosted-collector) below, and then create the HTTP Source on the collector.

### Configure a Hosted Collector

1. In the Sumo Logic platform, select **Manage Data > Collection > Collection**.
1. Click **Add Collector**.
1. Click **Hosted Collector.**
1. The **Add Hosted Collector** popup appears.  
    ![add-hosted-collector.png](/img/cse/add-hosted-collector.png)
1. **Name**. Provide a Name for the Collector.
1. **Description**. (Optional)
1. **Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`. 
1. **Fields**. 
    1. If you are planning that all the sources you add to this collector will forward log messages to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will cause the collector to forward all of the logs collected by all of the sources on the collector to CSE.
    1. If all sources in this collector will be AWS CloudTrail sources, add an additional field with key `_parser` and value */Parsers/System/AWS/CloudTrail*.

:::note
It’s also possible to configure individual sources to forward to CSE, as described in the following section.
:::

### Configure an AWS CloudTrail Source

1. In Sumo Logic, select **Manage Data > Collection > Collection**. 
1. Navigate to the Hosted Collector where you want to create the source.
1. On the **Collectors** page, click **Add Source** next to a Hosted Collector.
1. Select **AWS CloudTrail**. 
1. The page refreshes.  
    ![cloudtrail-source.png](/img/cse/cloudtrail-source.png)
1. **Name**. Enter a name for the source. 
1. **Description**. (Optional) 
1. **S3 Region**. Choose the AWS Region the S3 bucket resides in.
1. **Bucket Name**. The name of your organizations S3 bucket as it appears in AWS.
1. **Path Expression**. The path expression of the log file(s) in S3, can contain wildcards to include multiple log files.
1. **Source Category**. Enter a string to tag the output collected from the source. The string that you supply will be saved in a metadata field called `_sourceCategory`.
1. **Fields**.
    1. If you are not forwarding all sources in the hosted collector to CSE, click the **+Add Field** link, and add a field whose name is `_siemForward` and value is *true*. This will ensure all logs for this source are forwarded to CSE.
    1. Add another field named `_parser` with value */Parsers/System/AWS/CloudTrail*.
1. **AWS Access**. For AWS Access you have two Access Method options. Select **Role-based access** or **Key access** based on the AWS authentication you are providing. Role-based access is preferred. Note that Sumo Logic access to AWS (instructions are provided above in [Step 1](#step-1-enable-aws-cloudtrail-logs))  is a prerequisite for role-based access
    * **Role-based access**. Enter the Role ARN that was provided by AWS after creating the role.   
        ![role-arn.png](/img/cse/role-arn.png)
    * **Key access**. Enter the Access Key ID and Secret Access Key. See [AWS Access Key ID](http://docs.aws.amazon.com/STS/latest/UsingSTS/UsingTokens.html#RequestWithSTS) and [AWS Secret Access Key](https://aws.amazon.com/iam/) for details.
14. Click **Save**.

## Step 3: Verify ingestion

In this step, you verify that your logs are successfully making it into CSE. 

1. Click the gear icon, and select **Log Mappings** under **Incoming Data**.  
    ![log-mappings-link.png](/img/cse/log-mappings-link.png)
1. On the **Log Mappings** page search for "CloudTrail" and check under **Record Volume**.   
    ![cloudtrail-record-volume.png](/img/cse/cloudtrail-record-volume.png)
1. For a more granular look at the incoming records, you can also search the Sumo Logic platform for CloudTrail security records.  
    ![cloudtrail-search.png](/img/cse/cloudtrail-search.png)


 
